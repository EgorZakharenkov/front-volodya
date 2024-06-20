import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import CustomCard from "../components/Card/Card";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getHero } from "../redux/slices/hero";

const Heroes = () => {
  const heroes = useAppSelector((state) => state.hero.heroes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getHero());
  }, []);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.items}>
          {heroes &&
            heroes.map((item: any) => (
              <CustomCard
                id={item._id}
                title={item.fullName}
                description={item.description}
                image={item.image}
                hero={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Heroes;
