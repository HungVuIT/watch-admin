// import { Typography } from '@mui/material';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// export const Dashboard = () => {
//     const [dashboardData, setDashboardData] = useState(null);
    
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get("https://dhwatch.onrender.com/api/shops/dashbroad-admin", {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("auth"),
//             },
//           });
//           setDashboardData(response.data.data);
//         } catch (error) {
//           console.error(error);
//         }
//       };
  
//       fetchData();
//     }, []);
  
//     return (
//       <div>
//         {dashboardData ? (
//           <div>
//             <Typography variant="h4">Tổng đơn hàng: {dashboardData.orderCount}</Typography>
//             <Typography variant="h4">Số sản phẩm bán ra: {dashboardData.soldCount._sum.quantity}</Typography>
//             <Typography variant="h4">Doanh thu: {dashboardData.revenue._sum.total}</Typography>
//             <Typography variant="h4">Số đồng hồ: {dashboardData.watchCount}</Typography>
//           </div>
//         ) : (
//           <Typography variant="body1">Loading...</Typography>
//         )}
//       </div>
//     );
//   }

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js/auto';
Chart.register(...registerables);


const Wrapper = styled.div`
  padding: 5px;
  display: flex;
`;

const Watch = styled.div`
  width: 50vw;
  height: 100%;
`;

const Information = styled.div`
  width: calc(100% - 50vw);
  padding: 5px;
`;

const Item = styled.div`
  display: flex;
  padding-left: 20px;
`;

const Title = styled.h1`
  width: 40%;
  font-size: 20px;
  font-weight: 500;
`;

const Content = styled.div`
  font-size: 20px;
  width: 60%;
`;

export const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [chartData, setChartData] = useState({
    labels: ['Số loại sản phẩm', 'Đã bán'],
    datasets: [
      {
        label: 'Đồng hồ',
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0'
        ],
        borderColor: 'black',
        borderWidth: 2
      }
    ]
  });

  useEffect(() => {
    getInforDashboard();
  }, []);

  const getInforDashboard = async () => {
    try {
      const response = await axios.get('https://dhwatch.onrender.com/api/shops/dashbroad-admin', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth")
        }
      });
      const { data } = response.data;
      setChartData((prev) => ({
        ...prev,
        datasets: [
          {
            label: 'Đồng hồ',
            data: [data.watchCount, data.soldCount._sum.quantity],
            backgroundColor: [
              'rgba(75,192,192,1)',
              '#50AF95',
              '#f3ba2f',
              '#2a71d0'
            ],
            borderColor: 'black',
            borderWidth: 2
          }
        ]
      }));
      setDashboard(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <>
      {dashboard && (
        <Wrapper>
          <Information>
            <Item>
              <Title>Số đồng hồ trong kho:</Title>
              <Content>{dashboard.watchCount}</Content>
            </Item>
            <Item>
              <Title>Số đơn:</Title>
              <Content>{dashboard.orderCount}</Content>
            </Item>
            <Item>
              <Title>Doanh thu:</Title>
              <Content>{dashboard.revenue._sum.total}</Content>
            </Item>
          </Information>
          <br></br>
          <Watch>
            <Bar
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Thống kê số lượng đồng hồ'
                  },
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </Watch>

          
        </Wrapper>
      )}
    </>
  );
}

