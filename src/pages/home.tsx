import { getInputUtilityClass } from '@mui/material';
import { Variable } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/overview/view';
import ApiService from 'src/service/network_service';

// ----------------------------------------------------------------------

export default function Page() {


  const [loaded, setLoaded] = useState(false);
  const dataFetchedRef = useRef(false); // Ref to track if data has been fetched



  const [initialState, setInitialState] = useState({
    totalSaless: 0,
    monthlySales: [],
    newUsers: [],
    totalUsers: 0,
    monthlyRevenue: [],
    totalmonthlyRevenue: 0

  });
  // Fetch Monthly Sales Data
  const getMonthlySales = async () => {
    try {
      const data = await new ApiService().get('admin/analytics/monthly-sales');

      const users = await new ApiService().get('admin/analytics/new-users');

      const revenue = await new ApiService().get('admin/analytics/monthly-revenue');

      // setMonthlySales([40]);
      // varaible = data.data.series;
      // setTotalSales(19);

      setInitialState({
        totalSaless: data.data.total,
        monthlySales: data.data.series,
        monthlyRevenue: revenue.data.series,
        totalmonthlyRevenue: revenue.data.total,
        newUsers: users.data.series,
        totalUsers: users.data.total,
      })

      // setDummyState([34, 65, 43, 67]);
      // setDummyState1('skdk');

      console.log('montly sales data', data);
    } catch (e) {
      console.log(e);
    }
  };

  // Fetch New Users Data
  // const getNewUsers = async () => {
  //   try {
  //     setNewUsers(data.data.series || []);
  //     setTotalUsers(data.data.total);


  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // Fetch Monthly Revenue Data
  // const getMonthlyRevenue = async () => {
  //   try {
  //     setMonthlyRevenue(data.data.series || []);
  //     setTotalMonthlyRevenue(data.data.total);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    if (dataFetchedRef.current) return;

    const getData = async () => {
      await getMonthlySales();
      // await getNewUsers();
      // await getMonthlyRevenue();

      setLoaded(true);
    };

    getData();
    dataFetchedRef.current = true;
  }, []);

  console.log('dkdkdkdkdkd', initialState)

  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      {loaded ?

        <OverviewAnalyticsView monthSales={initialState.monthlySales} montlyRevenue={initialState.monthlyRevenue} totalSales={initialState.totalSaless} totalUsers={initialState.totalUsers} newUsers={initialState.newUsers} totalMonthlyRevenue={initialState.totalmonthlyRevenue} />

        : (<div>Loading</div>)
      }
    </>
  );
}
