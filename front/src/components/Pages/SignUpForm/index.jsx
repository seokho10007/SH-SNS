import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Router from 'next/router';
import Loader from '../../UI/Loader';
import { SIGN_UP_REQUEST } from '../../../reducers/user';
import useInput from '../../../hooks/useInput';
import useClick from '../../../hooks/useClick';
import { LoadInner } from '../../AppLayOut/Header/MobileHeaderForm';
import Button from '../../UI/Button';
import {
	SignUpWrapper,
	InputBox,
	SignUpHeader,
	SignUpInner,
	SignUpMainContent,
	CheckBox,
	SignUpFormWrapper,
} from './style';

const SignUpFrom = () => {
	const [firstName, setFirstName] = useInput('');
	const [lastName, setLastName] = useInput('');
	const [userId, setUserId] = useInput('');
	const [nickname, setNickname] = useInput('');
	const [birth, setBirth] = useInput('');
	const [gender, genderHandler] = useInput('');
	const [term, setTerm] = useClick(false);

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [termError, setTermError] = useState(false);
	const [visible, setVisible] = useState(false);
	const [type, setType] = useState('password');

	const dispatch = useDispatch();

	const { me, signUpError, signUpDone, signUpLoading } = useSelector((state) => state.user);

	useEffect(() => {
		signUpDone && Router.replace('/');
	}, [signUpDone]);

	useEffect(() => {
		if (signUpError) {
			if (signUpError !== null) alert(signUpError);
		}
	}, [signUpError]);

	useEffect(() => {
		me && Router.replace('/');
	}, [me]);

	const onSignUp = useCallback(
		(e) => {
			e.preventDefault();

			if (password.length < 4) {
				return setPasswordError(true);
			}
			if (!term) {
				return setTermError(true);
			}

			dispatch({
				type: SIGN_UP_REQUEST,
				data: {
					userId,
					password,
					firstName,
					lastName,
					nickname,
					birth,
					gender,
				},
			});
		},
		[userId, nickname, firstName, lastName, birth, gender, term, password],
	);
	const onChangePassword = useCallback(
		(e) => {
			setPassword(e.target.value);

			if (password.length >= 3) setPasswordError(false);
		},
		[password, passwordError],
	);

	const onChangeType = useCallback(() => {
		setVisible(!visible);
		type == 'password' ? setType('text') : setType('password');
	}, [visible, type]);

	return (
		!me && (
			<>
				<SignUpFormWrapper>
					<SignUpWrapper>
						<SignUpInner>
							<SignUpHeader>
								<div>가입하기</div>
								<div>빠르고 간단합니다.</div>
							</SignUpHeader>
							<SignUpMainContent onSubmit={onSignUp}>
								<InputBox>
									<input
										placeholder="성(姓)"
										type="text"
										value={firstName}
										onChange={setFirstName}
										required
									/>
									<input
										placeholder="이름(성은 제외)"
										type="text"
										value={lastName}
										onChange={setLastName}
										required
									/>
								</InputBox>

								<InputBox>
									<input
										placeholder="아이디(한글x)"
										type="text"
										value={userId}
										onChange={setUserId}
										onKeyUp={(e) =>
											(e.target.value = e.target.value.replace(
												/[^a-zA-Z-_0-9]/g,
												'',
											))
										}
										required
									/>
								</InputBox>

								<InputBox>
									<input
										placeholder="비밀번호(4글자 이상)"
										type={type}
										value={password}
										onChange={onChangePassword}
										onKeyUp={(e) =>
											(e.target.value = e.target.value.replace(
												/[^a-zA-Z-_0-9]/g,
												'',
											))
										}
										required
									/>
									<div onClick={onChangeType} title="비밀번호 확인">
										{!visible ? (
											<AiOutlineEye size={23} />
										) : (
											<AiOutlineEyeInvisible size={23} />
										)}
									</div>
								</InputBox>
								{passwordError && (
									<div
										style={{
											color: 'red',
											fontSize: '1.2rem',
											marginBottom: '1.2rem',
										}}
									>
										비밀번호는 4글자 이상이어야 합니다.
									</div>
								)}

								<InputBox>
									<input
										placeholder="닉네임"
										type="text"
										value={nickname}
										onChange={setNickname}
										onKeyUp={(e) =>
											(e.target.value = e.target.value.replace(
												/[^a-zA-Z-_0-9]/g,
												'',
											))
										}
										required
									/>
								</InputBox>

								<div>
									<span>생일</span>
								</div>
								<InputBox>
									<input
										type="date"
										name="date"
										value={birth}
										onChange={setBirth}
										required
									/>
								</InputBox>

								<div>
									<span>성별</span>
								</div>
								<div>
									<CheckBox>
										<label htmlFor="male">남성</label>
										<input
											id="male"
											type="radio"
											name="gender"
											value="male"
											className="gender"
											required
											onClick={genderHandler}
										/>
									</CheckBox>

									<CheckBox>
										<label htmlFor="female">여성</label>
										<input
											id="female"
											type="radio"
											name="gender"
											value="female"
											required
											onClick={genderHandler}
										/>
									</CheckBox>
								</div>

								<div onClick={setTerm}>
									<input
										name="term"
										type="checkbox"
										checked={term}
										onChange={setTerm}
									/>
									<label htmlFor="term">동의함</label>
								</div>
								{termError && (
									<div
										style={{
											color: 'red',
											fontSize: '1.2rem',
											marginBottom: '1.2rem',
										}}
									>
										약관에 동의하셔야 합니다.
									</div>
								)}
								<Button type="submit">
									{signUpLoading ? (
										<LoadInner>
											<Loader type="spin" color="#ccc" size={20} />
										</LoadInner>
									) : (
										'가입하기'
									)}
								</Button>
							</SignUpMainContent>
						</SignUpInner>
					</SignUpWrapper>
				</SignUpFormWrapper>
			</>
		)
	);
};

export default React.memo(SignUpFrom);
