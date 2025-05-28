import getData from '@/api/getData';
import { toast } from 'react-toastify';
import { UserInfoProps } from '../types/mypageType';

export default async function getUserInfo() {
  try {
    const response = await getData<UserInfoProps>('/member/profile');
    return response;
  } catch (error) {
    toast.error('유저 정보를 가져오는데 실패했습니다. 다시 로그인 해주세요!', {
      autoClose: 1500,
    });
    throw error;
  }
}
