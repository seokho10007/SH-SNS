import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_NOTICE_REQUEST } from '../reducers/user';

export { default } from '../components/Pages/Home';

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req?.headers.cookie;

	context.req && cookie && (axios.defaults.headers.Cookie = cookie);

	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});

	context.store.dispatch({
		type: LOAD_MAIN_POSTS_REQUEST,
	});

	context.store.dispatch({
		type: LOAD_USER_NOTICE_REQUEST,
	});

	context.store.dispatch(END);

	await context.store.sagaTask.toPromise();
});
