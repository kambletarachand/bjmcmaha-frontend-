import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getVisitorByEmail,
    createVisitor,
    updateVisitor,
    verifyVisitorEmail,
    checkDuplicateVisitors,
    updateVisitorPassword,
} from '../../api/visitorApi';

export const checkVisitorData = createAsyncThunk(
    'user/checkVisitorData',
    async (email) => {
        const response = await checkDuplicateVisitors(email);
        return response;
    }
);

export const loginVisitor = createAsyncThunk(
    'user/loginVisitor',
    async ({ email, password }) => {
        const visitor = await getVisitorByEmail(email);
        // Perform password verification (example assumes password matching is handled backend)
        if (visitor && visitor.password === password) {
            return visitor;
        }
        throw new Error('Invalid email or password');
    }
);

// export const signupVisitor = createAsyncThunk(
//   'user/signupVisitor',
//   async ({ email, password, phoneNumber, address, role }) => {
//       const newVisitor = await createVisitor({ email, password, phoneNumber, address, role });
//       return newVisitor;
//   }
// );

// CORRECT: Wrap email, phoneNumber, address inside `contactDetails`
export const signupVisitor = createAsyncThunk(
  'user/signupVisitor',
  async ({ contactDetails, password, role }) => {
    const newVisitor = await createVisitor({
      contactDetails, // { email, phoneNumber, address }
      password,
      role,
    });

    return newVisitor;
  }
);




export const fetchVisitorData = createAsyncThunk(
    'user/fetchVisitorData',
    async (email) => {
        const visitor = await getVisitorByEmail(email);
        return visitor;
    }
);

export const updateVisitorProfile = createAsyncThunk(
    'user/updateVisitorProfile',
    async ({ id, visitorData }) => {
        const updatedVisitor = await updateVisitor(id, visitorData);
        return updatedVisitor;
    }
);

export const verifyEmail = createAsyncThunk(
    'user/verifyEmail',
    async (email) => {
        const result = await verifyVisitorEmail(email);
        return result;
    }
);

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async ({ id, passwordData }) => {
        const result = await updateVisitorPassword(id, passwordData);
        return result;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        visitor: null,
        loading: false,
        error: null,
        isNewUser: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkVisitorData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkVisitorData.fulfilled, (state, action) => {
                state.loading = false;
                state.isNewUser = action.payload.isNewUser;
            })
            .addCase(checkVisitorData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(loginVisitor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginVisitor.fulfilled, (state, action) => {
                state.loading = false;
                state.visitor = action.payload;
            })
            .addCase(loginVisitor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(signupVisitor.fulfilled, (state, action) => {
                state.visitor = action.payload;
            })
            .addCase(fetchVisitorData.fulfilled, (state, action) => {
                state.visitor = action.payload;
            })
            .addCase(updateVisitorProfile.fulfilled, (state, action) => {
                state.visitor = { ...state.visitor, ...action.payload };
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                if (state.visitor) {
                    state.visitor.verified = true;
                }
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                if (state.visitor) {
                    state.visitor.password = action.payload.password;
                }
            });
    },
});

export const selectVisitor = (state) => state.user.visitor;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const selectIsNewUser = (state) => state.user.isNewUser;

export default userSlice.reducer;
