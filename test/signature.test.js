let chai = require('chai')
let chaiHttp = require('chai-http')
chai.use(chaiHttp)
const crypto = require('crypto');
const fs = require('fs');
require('chai').should()
require('dotenv').config()

const serverURL = `http://localhost:${process.env.TRULIOO_PORT}`
const incorrectSignAlgorithms = ['DSA',
    'DSA-SHA',
    'DSA-SHA1',
    'DSA-SHA1-old',
    'RSA-MD4',
    'RSA-MD5',
    'RSA-MDC2',
    'RSA-RIPEMD160',
    'RSA-SHA',
    'RSA-SHA1',
    'RSA-SHA1-2',
    'RSA-SHA224',
    'RSA-SHA384',
    'RSA-SHA512',
    'dsaEncryption',
    'dsaWithSHA',
    'dsaWithSHA1',
    'dss1',
    'ecdsa-with-SHA1',
    'md4',
    'md4WithRSAEncryption',
    'md5',
    'md5WithRSAEncryption',
    'mdc2',
    'mdc2WithRSA',
    'ripemd',
    'ripemd160',
    'ripemd160WithRSA',
    'rmd160',
    'sha',
    'sha1',
    'sha1WithRSAEncryption',
    'sha224',
    'sha224WithRSAEncryption',
    'sha384',
    'sha384WithRSAEncryption',
    'sha512',
    'sha512WithRSAEncryption',
    'shaWithRSAEncryption',
    'ssl2-md5',
    'ssl3-md5',
    'ssl3-sha1',
    'whirlpool']
//TODO check why'sha256', 'sha256WithRSAEncryption' verifies

describe("Signature", () => {

    describe('countryCodes', () => {
        it('public key verifies the response', (done) => {
            chai.request(serverURL)
                .get('/api/countryCodes')
                .end((_, res) => {

                    const verifyResult = getSignatureVerifyResult(res.body, process.env.SIGNATURE_ALGORITHM)
                    verifyResult.should.be.true

                    done()
                });
        });

        it('Incorrect public key does Not verify the response', (done) => {
            chai.request(serverURL)
                .get('/api/countryCodes')
                .end((err, res) => {

                    const manipulatedResponse = {
                        response: '["I","INJECTED","SOMETHING","MALICIOUS","IN","YOUR","SYSTEM"]',
                        signature: res.body.signature
                    }
                    const verifyResult = getSignatureVerifyResult(manipulatedResponse, process.env.SIGNATURE_ALGORITHM)
                    verifyResult.should.not.be.true

                    done()
                });
        });

        it('Incorrect signing algorithm does Not verify the response', (done) => {
            chai.request(serverURL)
                .get('/api/countryCodes')
                .end((err, res) => {

                    incorrectSignAlgorithms.filter(signAlgo => signAlgo !== process.env.SIGNATURE_ALGORITHM).forEach(incorrectSignAlgorithm => {
                        const verifyResult = getSignatureVerifyResult(res.body, incorrectSignAlgorithm)
                        verifyResult.should.not.be.true
                    })

                    done()
                });
        });
    });

    describe('getFields', () => {
        it('public key verifies the response for input "US" ', (done) => {
            chai.request(serverURL)
                .get('/api/getFields/US')
                .end((_, res) => {

                    const verifyResult = getSignatureVerifyResult(res.body, process.env.SIGNATURE_ALGORITHM)
                    verifyResult.should.be.true

                    done()
                });
        });

        it('Incorrect public key does Not verify the response for input "US"', (done) => {
            chai.request(serverURL)
                .get('/api/getFields/US')
                .end((err, res) => {
                    const manipulatedResponse = {
                        response: '["I","INJECTED","SOMETHING","MALICIOUS","IN","YOUR","SYSTEM"]',
                        signature: res.body.signature
                    }

                    const verifyResult = getSignatureVerifyResult(manipulatedResponse, process.env.SIGNATURE_ALGORITHM)
                    verifyResult.should.not.be.true

                    done()
                });
        });

        it('Incorrect signing algorithm does Not verify the response for input "US"', (done) => {
            chai.request(serverURL)
                .get('/api/getFields/US')
                .end((err, res) => {

                    incorrectSignAlgorithms.filter(signAlgo => signAlgo !== process.env.SIGNATURE_ALGORITHM).forEach(incorrectSignAlgorithm => {
                        const verifyResult = getSignatureVerifyResult(res.body, incorrectSignAlgorithm)
                        verifyResult.should.not.be.true
                    })

                    done()
                });
        });
    });

    describe('verify', () => {

        const verifyPayload = { "AcceptTruliooTermsAndConditions": true, "CleansedAddress": false, "ConfigurationName": "Identity Verification", "CountryCode": "NO", "DataFields": { "PersonInfo": { "FirstGivenName": "test", "FirstSurName": "dw", "DayOfBirth": 1, "MonthOfBirth": 2, "YearOfBirth": 3 }, "Location": { "StreetName": "test" }, "Communication": {} } }

        it('public key verifies the response ', (done) => {
            chai.request(serverURL)
                .post('/api/verify')
                .send(
                    verifyPayload
                ).end((_, res) => {

                    const verifyResult = getSignatureVerifyResult(res.body, process.env.SIGNATURE_ALGORITHM)
                    verifyResult.should.be.true

                    done()
                });
        });

        it('Incorrect public key does Not verify the response', (done) => {
            chai.request(serverURL)
                .get('/api/getFields/US')
                .end((err, res) => {
                    const manipulatedResponse = {
                        response: 'AS A HACKER, I OVERRODE THE RESPONSE AND VERIFIED MYSELF THROUGH TRULIOO API.',
                        signature: res.body.signature
                    }

                    const verifyResult = getSignatureVerifyResult(manipulatedResponse, process.env.SIGNATURE_ALGORITHM)
                    verifyResult.should.not.be.true

                    done()
                });
        });

        it('Incorrect signing algorithm does Not verify the response for input "US"', (done) => {
            chai.request(serverURL)
                .get('/api/getFields/US')
                .end((err, res) => {

                    incorrectSignAlgorithms.filter(signAlgo => signAlgo !== process.env.SIGNATURE_ALGORITHM).forEach(incorrectSignAlgorithm => {
                        const verifyResult = getSignatureVerifyResult(res.body, incorrectSignAlgorithm)
                        verifyResult.should.not.be.true
                    })

                    done()
                });
        });
    });

    const getSignatureVerifyResult = (res, signatureAlgorithm) => {
        const stringifiedResponse = JSON.stringify(res.response)
        let pem = fs.readFileSync('test/PUBLIC.pem')
        let publicKey = pem.toString('ascii')

        const verifier = crypto.createVerify(signatureAlgorithm)

        const clientSignature = res.signature
        verifier.update(stringifiedResponse, 'ascii')
        const publicKeyBuf = new Buffer(publicKey, 'ascii')
        const signatureBuf = new Buffer(clientSignature, 'hex')
        const result = verifier.verify(publicKeyBuf, signatureBuf)

        return result;
    }
})