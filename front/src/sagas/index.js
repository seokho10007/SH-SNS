import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';
import searchSaga from './search';
import tagSaga from './tag';

const backUrl =
	process.env.NODE_ENV === 'production'
		? 'https://api.hangerncloset.com'
		: 'http://localhost:3065';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
	yield all([fork(userSaga), fork(postSaga), fork(searchSaga), fork(tagSaga)]);
}
