import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { findWorkoutsByUserId, IWorkoutInterface } from '../../pages/api/providers/workout.provider';
import WorkoutsList from '@/components/Workouts/WorkoutsList';
import { getUserToken } from '@/pages/api/providers/auth.provider';

interface WorkoutsListProps {
  userId: string; 
}

export default function Workouts ({ userId }: WorkoutsListProps) {
  const router = useRouter();
  const [ userWorkouts, setUserWorkouts ] = useState<IWorkoutInterface[]>([]); 

  const fetchUserWorkouts = async () => {
    try {
      const token = getUserToken();

      if (!token) {
        router.push('/login');
        return;
      }     

      const workoutsByUser = await findWorkoutsByUserId(token, userId as string);
      
      setUserWorkouts(workoutsByUser);
    } catch (error) {
      console.error(error);
      router.push('/login');
    }
  };



useEffect(() => {    
  fetchUserWorkouts();
}, []);

  return (
    <>      
      <WorkoutsList fetchUserWorkouts={fetchUserWorkouts}  workouts={ userWorkouts } userId={userId}/>
    </>
  )
}