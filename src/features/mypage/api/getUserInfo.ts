import getData from '@/api/getData';
import { toast } from 'react-toastify';
import { UserInfoProps } from '../types/mypageType';

export default async function getUserInfo() {
  try {
    const response = await getData<UserInfoProps>('/member/profile');
    return response;
  } catch (error) {
    toast.error('Error fetching user info');
    throw error;
  }
}
