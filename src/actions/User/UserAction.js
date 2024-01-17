import {
    emailConstants,
    otpConstants,
    updateAdminAvatarConstant,
    updateAdminConstant,
    userLoginConstants,
    userUpdateConstants
} from "../../constant/constant";
import axios from "../../helpers/axios";


export const adminLogin = (user) => {

    return async (dispatch) => {
        dispatch({ type: userLoginConstants.LOGIN_REQUEST });
        console.log("=======login====1",);
        const res = await axios.post(`/login`, {
            ...user,
        }).catch((err) => {
            console.log("===test===", err.response)
            const { message } = err.response.data;
            console.log("===message===", message)
            dispatch({
                type: userLoginConstants.LOGIN_FAILURE,
                payload: {
                    message,
                },
            });
        })
        console.log("=======login====", res);
        if (res.status === 200) {
            const { user } = res.data;
            localStorage.setItem('admin_id', user?.user?._id);
            localStorage.setItem('admin_fullname', user?.user?.fullname);
            localStorage.setItem('admin_email', user?.user?.email);
            localStorage.setItem('admin_phone', user?.user?.phone);
            localStorage.setItem('admin_authenticate', user?.user?.authenticate);
            localStorage.setItem('admin_avatar', user?.user?.avatar);
            dispatch({
                type: userLoginConstants.LOGIN_SUCCESS,
                payload: {
                    user,
                },
            });
        }
    };
};


export const adminUpdate = (user) => {
    return async (dispatch) => {
        dispatch({ type: updateAdminConstant.UPDATE_ADMIN_REQUEST });
        const res = await axios.post(`/update-admin`, {
            ...user,
        });
        if (res.status === 200) {
            const { user } = res.data;
            localStorage.setItem('admin_fullname', user?.fullname);
            localStorage.setItem('admin_email', user?.email);
            localStorage.setItem('admin_phone', user?.phone);
            dispatch({
                type: updateAdminConstant.UPDATE_ADMIN_SUCCESS,
                payload: {
                    user: user,
                },
            });
        } else {
            if (res.status === 400 || res.status === 401) {
                dispatch({
                    type: userUpdateConstants.UPDATE_FAILURE,
                    payload: { message: res.data.message },
                });
            }
        }
    };
};

export const adminUpdateAvatar = (Obj) => {
    const formData = new FormData();
    for (const image of Obj["images"]) {
        formData.append("images", image);
    }
    for (const key in Obj) {
        if (Obj[key] !== undefined && key !== "images") {
            formData.append(key, Obj[key]);
        }
    }
    return async (dispatch) => {
        dispatch({ type: updateAdminAvatarConstant.UPDATE_ADMIN_AVATAR_REQUEST });
        const res = await axios.post(`/update-admin-avatar`, formData);
        if (res.status === 200) {
            const { avatar } = res.data;
            localStorage.setItem('admin_avatar', avatar);
            dispatch({
                type: updateAdminAvatarConstant.UPDATE_ADMIN_AVATAR_SUCCESS,
                payload: {
                    avatar: avatar,
                },
            });
        }
    };
};

export const adminLoginWithOTP = (phone) => {
    phone = parseInt(phone);
    return async (dispatch) => {
        const res = await axios.post(`/signinotp`, {
            phone: phone,
        });
        if (res.status === 200) {
            const { user } = res.data;
            console.log(user, 'user');
            localStorage.setItem('admin_id', user?._id);
            localStorage.setItem('admin_fullname', user?.fullname);
            localStorage.setItem('admin_email', user?.email);
            localStorage.setItem('admin_authenticate', true);
            dispatch({
                type: userLoginConstants.LOGIN_SUCCESS,
                payload: {
                    user,
                },
            });
        } else {
            if (res.status === 400 || res.status === 401) {
                dispatch({
                    type: userLoginConstants.LOGIN_FAILURE,
                    payload: { message: res.data.error },
                });
            }
        }
    };
};

export const adminSendEmailVerification = (email, subject) => {
    return async (dispatch) => {
        dispatch({ type: emailConstants.EMAIL_REQUEST });
        try {
            const res = await axios.post('/admin-emailverification', {
                email,
                subject,
            })
            if (res.status === 200) {
                const { emailSent, message, otp } = res.data;
                dispatch({
                    type: emailConstants.EMAIL_SUCCESS,
                    payload: {
                        emailSent: emailSent,
                        message: message,
                        otp: otp,
                    },
                });
            }
            return true;
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.success === false) {
                dispatch({
                    type: emailConstants.EMAIL_FAILURE,
                    payload: { error: error.response.data.message },
                });
            }
            else {
                dispatch({
                    type: emailConstants.EMAIL_FAILURE,
                    payload: { error: error.response.data.message },
                });
                console.error(error);
            }
            return false;
        }
    }
}

export const adminsendotp = (phone, sendOtpType) => {
    return async (dispatch) => {
        dispatch({ type: otpConstants.OTP_REQUEST });
        try {
            let res = '';
            if (sendOtpType === "login") {
                res = await axios.post(`/admin-mobileverification`, {
                    phone: `+91${phone}`,
                });
            }
            else {
                res = await axios.post(`/register/mobileverification`, {
                    phone: `+91${phone}`,
                });
            }
            if (res.status === 200) {
                const { otp, message } = res.data;
                dispatch({
                    type: otpConstants.OTP_SUCCESS,
                    payload: {
                        otpsent: true,
                        otp: otp,
                        message: message
                    },
                });
                return true;
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.success === false) {
                dispatch({
                    type: otpConstants.OTP_FAILURE,
                    payload: { error: error.response.data.message },
                });
            }
            else {
                dispatch({
                    type: otpConstants.OTP_FAILURE,
                    payload: { error: error.response.data.message },
                });
                console.error(error);
            }
            return false;
        }

    };
};
