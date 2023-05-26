import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../utils/firebase/firebase.utils";

const Dashboard = ({ user }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      const profile = await getUserProfile(user, user.displayName);
      setProfile(profile);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log("updated", profile);
  }, [profile]);

  return profile && <div>{profile.name}</div>;
};

export default Dashboard;
