import * as React from 'react';
import {SignInPage} from '@toolpad/core';
import {useTheme} from '@mui/material/styles';

// preview-start
const providers = [{id: 'credentials', name: 'Email and Password'}];
// preview-end

const signIn = async (provider, formData) => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            alert(
                `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
            );
            resolve();
        }, 300);
    });
    return promise;
};

function CredentialsSignInPage() {
    return (
        <SignInPage signIn={signIn} providers={providers}/>
    );
}

export default CredentialsSignInPage;