import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer
} from "recharts";
import icon1 from "../../../assets/icon1.png";
import icon2 from "../../../assets/icon2.png";
import icon3 from "../../../assets/icon3.png";
import NavigationDrawer from "../../../components/navigationDrawer/index";
import BookingChart from "../../../components/BookingChart";


const Dashboard = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

 

  const cardData = [
    {
      label: 'Professionals',
      count: '20+',
      fill: '#00CCDD',
      icon: <img src={icon3} alt="icon1" width={30}
      height={30} />
    },
    {
      label: 'Bookings',
      count: '100+',
      fill: '#87A2FF',
      icon: <img src={icon2} alt="icon1" width={30}
      height={30} />
    },
    {
      label: 'Services',
      count: '10+',
      fill: '#8FD14F',
      icon: <img src={icon1} alt="icon1" width={30}
      height={30} />
    },
  ];

  return (
    <>
      <NavigationDrawer>
        <div className="dashboard_page vh-100">
            <div className="container mb-5">
              <div className="row  mt-5 pt-3 d-flex align-items-center justify-content-center">
                {cardData?.map((item, index) => (
                  <div className="col-md-4 mb-2 mb-md-0" key={index}>
                    <div className="progress-card p-3 ">
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>{item?.label}</h5>
                        {/* <img
                          src={icon}
                          alt="icon"
                          width={30}
                          height={30}
                          style={{ filter: `drop-shadow(0 0 0 ${item.fill})` }}
                        /> */}
                        {item?.icon}
                      </div>
                      <p className="fs-1 mt-2" style={{ color: item.fill }}>
                        {item?.count}
                      </p>
                      <ResponsiveContainer
                        width="100%"
                        height="20%"
                        className="mx-auto"
                      >
                        <AreaChart
                          width={500}
                          height={400}
                          data={data}
                          margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <Area
                            type="monotone"
                            dataKey="uv"
                            stroke={item.fill}
                            fill={item.fill}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             
             <BookingChart/>
            
          
          
        </div>
      </NavigationDrawer>
    </>
  );
};

export default Dashboard;
