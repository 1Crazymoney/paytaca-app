// genererated from paymentrequest.proto using protobufjs
// paymentrequest.proto: https://gist.github.com/khirvy019/369378aa1253ae31a71cb2e4955bedf0
export default {
    "nested": {
        "payments": {
            "options": {
                "java_package": "org.bitcoin.protocols.payments",
                "java_outer_classname": "Protos"
            },
            "nested": {
                "Output": {
                    "fields": {
                        "amount": {
                            "type": "uint64",
                            "id": 1,
                            "options": {
                                "default": 0
                            }
                        },
                        "script": {
                            "rule": "required",
                            "type": "bytes",
                            "id": 2
                        }
                    }
                },
                "PaymentDetails": {
                    "fields": {
                        "network": {
                            "type": "string",
                            "id": 1,
                            "options": {
                                "default": "main"
                            }
                        },
                        "outputs": {
                            "rule": "repeated",
                            "type": "Output",
                            "id": 2,
                            "options": {}
                        },
                        "time": {
                            "rule": "required",
                            "type": "uint64",
                            "id": 3
                        },
                        "expires": {
                            "type": "uint64",
                            "id": 4
                        },
                        "memo": {
                            "type": "string",
                            "id": 5
                        },
                        "paymentUrl": {
                            "type": "string",
                            "id": 6
                        },
                        "merchantData": {
                            "type": "bytes",
                            "id": 7
                        }
                    }
                },
                "PaymentRequest": {
                    "fields": {
                        "paymentDetailsVersion": {
                            "type": "uint32",
                            "id": 1,
                            "options": {
                                "default": 1
                            }
                        },
                        "pkiType": {
                            "type": "string",
                            "id": 2,
                            "options": {
                                "default": "none"
                            }
                        },
                        "pkiData": {
                            "type": "bytes",
                            "id": 3
                        },
                        "serializedPaymentDetails": {
                            "rule": "required",
                            "type": "bytes",
                            "id": 4
                        },
                        "signature": {
                            "type": "bytes",
                            "id": 5
                        }
                    }
                },
                "X509Certificates": {
                    "fields": {
                        "certificate": {
                            "rule": "repeated",
                            "type": "bytes",
                            "id": 1
                        }
                    }
                },
                "Payment": {
                    "fields": {
                        "merchantData": {
                            "type": "bytes",
                            "id": 1
                        },
                        "transactions": {
                            "rule": "repeated",
                            "type": "bytes",
                            "id": 2
                        },
                        "refundTo": {
                            "rule": "repeated",
                            "type": "Output",
                            "id": 3,
                            "options": {
                                "packed": false
                            }
                        },
                        "memo": {
                            "type": "string",
                            "id": 4
                        }
                    }
                },
                "PaymentACK": {
                    "fields": {
                        "payment": {
                            "rule": "required",
                            "type": "Payment",
                            "id": 1
                        },
                        "memo": {
                            "type": "string",
                            "id": 2
                        }
                    }
                }
            }
        }
    }
}