import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';

export { default } from '../../components/Pages/Profile/MainPosts';

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req?.headers.cookie;

	context.req && cookie && (axios.defaults.headers.Cookie = cookie);

	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});

	context.store.dispatch({
		type: LOAD_USER_INFO_REQUEST,
		data: { nickname: context.query.nickname },
	});

	context.store.dispatch({
		type: LOAD_USER_POSTS_REQUEST,
		data: { nickname: context.query.nickname },
	});

	context.store.dispatch(END);

	// api 호출
	await context.store.sagaTask.toPromise();
});