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

    it('can find affirmations by id', async() => {
        const oneAffirmation = await Shareable.create({
            user_name: 'Donald',
            affirmation: 'you are the second best',
        });

        return request(app)
            .get(`/shareables/${oneAffirmation._id}`)
            .then(res => {
                expect(res.body).toEqual(
                    {
                        _id: oneAffirmation.id,
                        user_name: 'Donald',
                        affirmation: 'you are the second best',
                        likes: 0,
                        __v: 0
                    }
                );
            });
    });

    it('can update an affirmation after finding it by id', async() => {
        const oneAffirmation = await Shareable.create({
            user_name: 'Donald',
            affirmation: 'you are the second best',
        });

        const newAffirmation = {
            user_name: 'Yonald',
            affirmation: 'you are the third best',
        };

        return request(app)
            .patch(`/shareables/${oneAffirmation._id}`)
            .send({ user_name: newAffirmation.user_name, affirmation: newAffirmation.affirmation })
            .then(res => {
                expect(res.body).toEqual(
                    {
                        _id: oneAffirmation.id,
                        user_name: 'Yonald',
                        affirmation: 'you are the third best',
                        likes: 0,
                        __v: 0
                    }
                );
            });
    });

    // it('can delete an affirmation by its id', async() => {
    //     const newAffirmation = await Shareable.create
    // })
});


