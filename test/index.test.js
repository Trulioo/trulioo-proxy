let chai = require('chai')
let chaiHttp = require('chai-http')
chai.use(chaiHttp)
require('chai').should()
require('dotenv').config()

const serverURL = `http://localhost:${process.env.TRULIOO_PORT}`

describe("endpoints", () => {

    describe('countryCodes', () => {
        it('countryCodes returns status 200', (done) => {
            chai.request(serverURL)
                .get('/api/countryCodes')
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                });
        });
    });

    describe('getFields', () => {
        it('getFields for "US" returns status 200', (done) => {
            chai.request(serverURL)
                .get('/api/getFields/US')
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                });
        });
    });

    describe('verify', () => {
        it('verify returns status 200', (done) => {
            chai.request(serverURL)
                .post('/api/verify')
                .send({
                    "AcceptTruliooTermsAndConditions": true,
                    "CleansedAddress": true,
                    "ConfigurationName": "Identity Verification",
                    "CountryCode": "CL",
                    "DataFields": {
                        "PersonInfo": { "FirstGivenName": "dw", "FirstSurName": "wd" },
                        "Location": { "AdditionalFields": {} }, "NationalIds": []
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                });
        });
    });
});