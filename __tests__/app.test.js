const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/app');
const Shareable = require('../lib/models/Shareable');



describe('app routes', () => {
    const mongo = new MongoMemoryServer();
    beforeAll(() => {
        return mongo.getUri()
            .then(uri => mongoose.connect(uri, {

                useUnifiedTopology: true,
                useNewUrlParser: true
            }));
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('creates a new shareable image url', () => {
        return request(app)
            .post('/shareables')
            .send({
                user_name: 'Briseida',
                affirmation: 'soar like an eagle',
            })

            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.anything(),
                    user_name: 'Briseida',
                    affirmation: 'soar like an eagle',
                    likes: 0,
                    __v: 0
                });
            });
    });

    it('gets a list of affirmations', async() => {
        await Shareable.create({
            user_name: 'Ronald',
            affirmation: 'you are the best'

        });

        return request(app)
            .get('/shareables')
            .then(res => {
                expect(res.body).toEqual([
                    {
                        _id: expect.anything(),
                        user_name: 'Ronald',
                        affirmation: 'you are the best',
                        likes: 0,
                        __v: 0
                    }
                ]);
            });
    });


});
