import React, { useEffect, useState } from 'react';
import Logo from '../../assets/mandala.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, adminLoginWithOTP, adminSendEmailVerification, adminsendotp, login, loginWithGoogle, loginWithOTP, sendEmailVerification, sendotp, signup } from '../../actions/User/UserAction';
import Spinner from '../../components/Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEyeOff } from 'react-icons/fi';
import { api } from '../../helpers/baseUrl';
import { BiMenu, BiX } from 'react-icons/bi';
import './Login.css';

const AdminLogin = () => {

  const authenticate = localStorage.getItem('admin_authenticate');
  useEffect(() => {
    if (authenticate) {
      navigate('/');
    }
  }, [authenticate])

  const auth = useSelector(state => state.admin);
  const successToast = () => {
    toast('Login Successfull', { position: toast.POSITION.TOP_CENTER })
  }

  const errorToast = (err) => {
    toast(`${err}`, { position: toast.POSITION.TOP_CENTER })
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullname, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const [emailVerificationCode, setEmailVerificationCode] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [signInWithMobile, setSignInWithMobile] = useState(true);
  const [signInWithEmail, setSignInWithEmail] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [otpScreen, setOtpScreen] = useState(false);
  const [emailVerifyScreen, setEmailVerifyScreen] = useState(false);

  const toggleEmailSignIn = () => {
    setSignInWithEmail(true);
    setSignInWithMobile(false);
    setSignUp(false);
    setOtpScreen(false);
    setEmailVerifyScreen(false);
  }

  const toggleMobileSignIn = () => {
    setSignInWithMobile(true);
    setSignInWithEmail(false);
    setSignUp(false);
    setOtpScreen(false);
    setEmailVerifyScreen(false);
  }

  useEffect(() => {
    if (auth?.authenticate) {
      navigate('/');
    }
  }, [auth?.authenticate, navigate])

  const loginUserWithMobileNumber = (e) => {
    e.preventDefault();
    setLoading(true);

    if (phone.length < 10) {
      errorToast("Invalid Mobile Number");
      setLoading(false);
      return;
    }
    dispatch(adminsendotp(phone, "login"))
      .then((sendOtpRes) => {
        if (!sendOtpRes) {
          setLoading(false);
          errorToast(auth?.error);
        } else {
          setLoading(false);
          toggleOtpScreen();
        }
      })
      .catch((error) => {
        setLoading(false);
        errorToast(error);
      });
  };

  const toggleOtpScreen = () => {
    setOtpScreen(true);
    setSignInWithEmail(false);
    setSignInWithMobile(false);
    setSignUp(false);
    setEmailVerifyScreen(false);
  }
  const toggleEmailVerifyScreen = () => {
    setEmailVerifyScreen(true);
    setOtpScreen(false);
    setSignInWithEmail(false);
    setSignInWithMobile(false);
    setSignUp(false);
  }

  const loginUserWithEmailPass = (e) => {
    setLoading(true);
    e.preventDefault();

    dispatch(adminSendEmailVerification(email, "Email Verification"))
      .then((sendOtpRes) => {
        if (!sendOtpRes) {
          setLoading(false);
          errorToast(auth?.error);
        } else {
          setLoading(false);
          toggleEmailVerifyScreen();
        }
      })
      .catch((error) => {
        setLoading(false);
        errorToast(auth?.error);
      });
  }

  const emailVerification = (e) => {
    e.preventDefault();
    if (emailVerificationCode == auth?.otp) {
      const user = {
        email,
        password
      }
      dispatch(adminLogin(user)).then(() => {
        console.log("======enter=====");
        successToast();
        console.log("======enter=====1");
        navigate("/");
        console.log("======enter=====2");
      }).catch((error) => {
        console.log("Error");
        errorToast(error);
      })
    }
  }

  const otpVerification = (e) => {
    e.preventDefault();
    if (verificationCode == auth?.otp) {
      dispatch(adminLoginWithOTP(phone)).then(() => {
        navigate("/", {
          state: {
          },
        });
      })
        .catch((error) => {
          console.log(error)
        });
    }
    else {
    }
  }


  return (
    <div className='flex flex-col'>
      <div className='w-full h-16 text-xl items-center flex text-white  pl-5 bg-red-600 font-dmsans'>
        HasthKala Admin Panel
      </div>
      <div className='w-full h-screen flex justify-start items-start mt-[-60px]'>
        <div className='hidden sm:flex w-1/2 h-full flex-col justify-center items-center scale-50 lg:scale-100 '>
          <div className='h-[300px] w-[300px] justify-center items-center ml-60'>
            <img className='mandala max-h-full max-w-full' src={Logo} alt="" />
          </div>
        </div>


        {/* SIGN IN WITH EMAIL AND PASSWORD  */}
        {signInWithEmail &&
          <div className='flex sm:w-1/2 w-full h-full flex-col justify-center items-center scale-90 lg:scale-100'>
            <div className='border border-[#1a1a1d27] shadow-2xl w-[370px] sm:w-[400px] h-[370px]  sm:mr-32 rounded-md'>

              <form action="" onSubmit={loginUserWithEmailPass}>
                <div className='text-pink w-full h-14 text-xl flex items-center font-semibold'>
                  <span className='cursor-pointer h-full w-1/2 flex justify-center items-center border-b-2 border-red-500 text-red-600' onClick={toggleMobileSignIn}>Sign In</span>
                </div>
                <div className='pl-10 pr-10 pt-6'>
                  <label className='text-sm font-dmsans text-left w-full flex' htmlFor="">Email Address</label>
                  <input type="text" className='border border-[#1a1a1d52] w-full h-11 mt-1 mb-4 text-sm text-gray pl-5 rounded-full' onChange={(e) => { setEmail(e.target.value) }} required />
                  <label className='text-sm font-dmsans text-left w-full flex' htmlFor="">Password</label>
                  <input type="password" className='border border-[#1a1a1d52] w-full h-11 mt-1 text-sm text-gray pl-5 rounded-full' onChange={(e) => { setPassword(e.target.value) }} required />
                  <button className='w-full h-11 bg-darkred font-dmsans uppercase text-[#ffffff] mt-5 rounded-full flex items-center justify-center' type='submit'>{loading ? <Spinner /> : `Sign In`}</button>

                </div>
              </form>
            </div>
          </div>
        }
        {/* SIGN IN WITH EMAIL AND PASSWORD  */}

        {/* SIGN IN WITH MOBILE NUMBER  */}
        {signInWithMobile &&
          <div className='flex sm:w-1/2 w-full h-full flex-col justify-center items-center scale-90 lg:scale-100'>
            <div className='border border-[#1a1a1d27] shadow-2xl w-[370px] sm:w-[400px]  sm:h-[370px] sm:mr-32 rounded-md'>

              <div>
                <div className='text-pink w-full h-14 text-xl flex items-center font-semibold'>
                  <span className='cursor-pointer h-full w-1/2 flex justify-center items-center border-b-2 border-red-500 text-red-600' onClick={toggleMobileSignIn}>Sign In</span>
                </div>
                <div className='pl-10 pr-10 pt-10'>
                  <label className=' flex text-sm font-dmsans' htmlFor="">Mobile Number</label>
                  <div className='relative items-center justify-start'>
                    <p className='absolute text-gray flex h-12 text-[16px] pl-2 items-center'>+91</p>
                    <input type="text" className='border border-[#1a1a1d52] w-full h-12 mt-1 mb-4  text-gray pl-10 rounded-full flex items-center' maxLength={10} onChange={(e) => { setPhone(e.target.value) }} />
                  </div>
                  <button className='w-full h-11 bg-darkred font-dmsans uppercase text-[#ffffff] mt-6 rounded-full flex items-center justify-center' onClick={loginUserWithMobileNumber} type='submit'>{loading ? <Spinner /> : `Sign In`}</button>
                  <div className='flex text-[13px] font-dmsans mt-3'>Login using <span onClick={toggleEmailSignIn} className='text-[#25baff] cursor-pointer'>Password</span></div>
                </div>
              </div>

            </div>
          </div>
        }
        {/* SIGN IN WITH MOBILE NUMBER  */}


        {otpScreen &&
          <div className='flex sm:w-1/2 w-full h-full flex-col justify-center items-center'>
            <div className='border border-[#1a1a1d27] shadow-2xl w-[370px] sm:w-[400px] sm:h-[300px]  sm:mr-32 rounded-md'>
              <form action="" onSubmit={otpVerification}>
                <div className='w-full h-12 flex items-end mb-3 font-semibold justify-center text-lg'>
                  Verify Your Mobile Number
                </div>
                <div className='text-[13px] text-gray pl-10 pr-10 text-center'>

                </div>
                <div className='pl-10 pr-10 pt-6'>
                  <label className='text-sm font-dmsans flex items-center justify-between mb-1' htmlFor="">
                    <span>Verification Code</span>
                    <span className='text-[#379bff] cursor-pointer'>Resend Code</span>
                  </label>
                  <input type="text" className='border border-[#1a1a1d52] w-full h-11 mt-1 text-sm text-gray pl-5 rounded-full' onChange={(e) => { setVerificationCode(e.target.value) }} required />
                  <button className='w-full h-11 bg-darkred font-dmsans uppercase text-[#ffffff] mt-5 rounded-full flex items-center justify-center' type='submit'>{loading ? <Spinner /> : `Verify me`}</button>
                </div>
              </form>

            </div>
          </div>
        }

        {emailVerifyScreen &&
          <div className='flex sm:w-1/2 w-full h-full flex-col justify-center items-center'>
            <div className='border border-[#1a1a1d27] shadow-2xl w-[360px] sm:w-[400px] h-[300px]  sm:mr-32 rounded-md'>
              <form action="" onSubmit={emailVerification}>
                <div className='w-full h-12 flex items-end mb-3 font-semibold justify-center text-lg'>
                  Verify Your Email Address
                </div>
                <div className='text-[13px] text-gray pl-10 pr-10 text-center'>
                  Enter the OTP sent to your email address <p className='font-semibold'>ha***************@gmail.com</p>
                </div>
                <div className='pl-10 pr-10 pt-6'>
                  <label className='text-sm font-dmsans flex items-center justify-between mb-1' htmlFor="">
                    <span>Verification Code</span>
                    <span className='text-[#379bff] cursor-pointer'>Resend Code</span>
                  </label>
                  <input type="text" className='border border-[#1a1a1d52] w-full h-11 mt-1 text-sm text-gray pl-5 rounded-full' onChange={(e) => { setEmailVerificationCode(e.target.value) }} required />
                  <button className='w-full h-11 bg-darkred font-dmsans uppercase text-[#ffffff] mt-5 rounded-full flex items-center justify-center' type='submit'>{loading ? <Spinner /> : `Verify me`}</button>
                </div>
              </form>

            </div>
          </div>
        }


      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminLogin