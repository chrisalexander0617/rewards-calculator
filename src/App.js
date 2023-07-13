import React, { useEffect, useState } from 'react';

const calculateRewardPoints = (transactions) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rewards = {
        total: 0,
        monthly: {},
      };

      transactions.forEach((transaction) => {
        const { customerId, purchaseAmount, date } = transaction;
        const month = new Date(date).getMonth() + 1;

        const points = Math.max(purchaseAmount - 100, 0) * 2 + Math.max(Math.min(purchaseAmount, 100) - 50, 0);
        
        rewards.total += points;

        if (!rewards.monthly[month]) {
          rewards.monthly[month] = {};
        }
        
        if (!rewards.monthly[month][customerId]) {
          rewards.monthly[month][customerId] = 0;
        }
        
        rewards.monthly[month][customerId] += points;
      });

      resolve(rewards);
    }, 1000);
  });
};

const App = () => {
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    const fetchRewards = async () => {
      const transactions = [
        { customerId: 1, purchaseAmount: 120, date: '2023-05-10' },
        { customerId: 2, purchaseAmount: 80, date: '2023-05-15' },
        { customerId: 1, purchaseAmount: 60, date: '2023-06-01' },
        { customerId: 2, purchaseAmount: 100, date: '2023-06-25' },
        { customerId: 1, purchaseAmount: 500, date: '2023-07-14' },
        { customerId: 2, purchaseAmount: 200, date: '2023-07-20' },
      ];

      const result = await calculateRewardPoints(transactions);
      setRewards(result);
    };

    fetchRewards();
  }, []);

  if (!rewards) return <div>Loading...</div>;

  return (
    <div>
      <h2>Total Reward Points: {rewards.total}</h2>
      <h2>Monthly Reward Points:</h2>
      <ul>
        {Object.entries(rewards.monthly).map(([month, customerPoints]) => (
          <li key={month}>
            <h3>Month {month}</h3>
            <ul>
              {Object.entries(customerPoints).map(([customerId, points]) => (
                <li key={customerId}>
                  Customer {customerId}: {points} points
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;