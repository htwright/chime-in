import {
    sendMessage,
    FETCH_QUESTION_REQUEST,
    fetchQuestionRequest,
    FETCH_QUESTION_SUCCESS,
    fetchQuestionSuccess,
    FETCH_QUESTION_FAILURE,
    fetchQuestionFailure,
    fetchQuestion,
    FETCH_USERS_REQUEST,
    fetchUsersRequest,
    FETCH_USERS_SUCCESS,
    fetchUsersSuccess,
    FETCH_USERS_FAILURE,
    fetchUsersFailure,
    fetchUsers
} from './action';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

let url = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production'){
  url = 'http://chime-in.herokuapp.com';
}

describe('fetchQuestionRequest', () => {
    it('Should return the action', () => {
        const action = fetchQuestionRequest();
        expect(action.type).toEqual(FETCH_QUESTION_REQUEST);
    });
});

describe('fetchQuestionSuccess', () => {
    it('Should return the action', () => {
        const action = fetchQuestionSuccess();
        expect(action.type).toEqual(FETCH_QUESTION_SUCCESS);
    });
});

describe('fetchQuestionFailure', () => {
    it('Should return the action', () => {
        const action = fetchQuestionFailure();
        expect(action.type).toEqual(FETCH_QUESTION_FAILURE);
    });
});

describe('fetchUsersRequest', () => {
    it('Should return the action', () => {
        const action = fetchUsersRequest();
        expect(action.type).toEqual(FETCH_USERS_REQUEST);
    });
});

describe('fetchUsersSuccess', () => {
    it('Should return the action', () => {
        const action = fetchUsersSuccess();
        expect(action.type).toEqual(FETCH_USERS_SUCCESS);
    });
});

describe('fetchUsersFailure', () => {
    it('Should return the action', () => {
        const action = fetchUsersFailure();
        expect(action.type).toEqual(FETCH_USERS_FAILURE);
    });
});

describe('fetchQuestion', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('Creates FETCH_QUESTION_SUCCESS when fetching question has been done', () => {
      nock(`${url}/api/questions/questionsList`)
        .get('/questionsList')
        .reply(200, { body: { questions: ['Is this working?'] } })
        const expectedActions = [
          { type: FETCH_QUESTION_REQUEST },
          { type: FETCH_QUESTION_SUCCESS, body: { questions: ['Is this working?'] } }
        ]
        const store = mockStore({ questions: [] })

        return store.dispatch(fetchQuestion()).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
