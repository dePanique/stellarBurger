import styles from "./profile-page.module.css";
import { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { logOutEnch } from "../services/actions/profile-page";
import { getUserInfoEnch } from "../services/actions/profile-page";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { EditProfile } from "./edit-profile";
import { ProfileOrders } from "./profile-orders";
import ProtectedRoute from "../components/protected-route/protected-route";
import { appUseDispatch } from "../utils/hooks";

export const ProfilePage: FC = () => {

  const dispatch = appUseDispatch();

  const handleLogOut = () => {
    dispatch(logOutEnch(localStorage.getItem('refreshToken')));
  };

  useEffect(() => {
    dispatch(getUserInfoEnch());
  }, [])

  return (
    <main className={styles.main}>
      <section className={styles.profile}>
        <div className={styles.editFrame}>
          <div className={styles.linksColumn}>
            <nav className="mb-20">
              <ul className={styles.linksColumn + ` text_color_primary `}>
                <li className={styles.listElement}>
                  <NavLink
                    exact to={{ pathname: '/profile' }}
                    className={styles.link + ' text text_type_main-medium text_color_inactive '}
                    activeClassName={styles.colorPrimary}
                  >
                    {'Профиль'}
                  </NavLink>
                </li>

                <li className={styles.listElement}>
                  <NavLink
                    exact to='/profile/orders'
                    className={styles.link + ' text text_type_main-medium text_color_inactive '}
                    activeClassName={styles.colorPrimary}
                  >
                    {'История заказов'}
                  </NavLink>
                </li>

                <li className={styles.listElement}>
                  <NavLink
                    exact to='/login'
                    className={styles.link + ' text text_type_main-medium text_color_inactive '}
                    activeClassName={styles.colorPrimary}
                    onClick={handleLogOut}
                  >
                    {'Выход'}
                  </NavLink>
                </li>
              </ul>
            </nav>

            <p className={styles.notice + ` text text_type_main-default text_color_inactive`}>
              В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
            </p>
          </div>
        </div>

        <Switch>
          <ProtectedRoute
            path="/profile"
            exact={true}
            unAuthOnly={false}
          >
            <EditProfile />
          </ProtectedRoute>
          <ProtectedRoute
            path="/profile/orders"
            exact={true}
            unAuthOnly={false}
          >
            <ProfileOrders />
          </ProtectedRoute>
        </Switch>
      </section>
    </main>
  )
}
