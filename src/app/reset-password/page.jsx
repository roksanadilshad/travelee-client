import ResetPassword from '@/components/Auth/ResetPassword';
import Link from 'next/link';
import React from 'react';
import { IoPlayBackOutline } from 'react-icons/io5';

const ResetPass = () => {
    return (
      <div className="flex justify-center flex-col gap-5 items-center min-h-screen">
        <div>
          <Link
            className="px-4 items-center gap-2 flex py-2 text-white text-sm font-medium bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
            href="/login"
          >
            <IoPlayBackOutline />
            Back Login
          </Link>
        </div>

        <div>
          <ResetPassword></ResetPassword>
        </div>
      </div>
    );
};

export default ResetPass;