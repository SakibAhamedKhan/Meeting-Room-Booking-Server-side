export const getLastMonthDataForBooking = async (
  data: any,
  numberMonths: Number
): Promise<any> => {
  const today = new Date();
  const months = [];
  for (let i = 0; i < Number(numberMonths); i++) {
    const month = new Date(today);
    month.setMonth(today.getMonth() - i);
    months.push(month.toISOString().slice(0, 7)); // Format as 'YYYY-MM'
  }
  console.log(months);

  const result = months.map((month) => {
    const monthData = data.filter((entry: any) => {
      const entryMonth = new Date(entry.date).toISOString().slice(0, 7); // 'YYYY-MM' format
      return entryMonth === month;
    });

    if (monthData.length > 0) {
      let price = 0;
      monthData.forEach((d: any) => {
        price += d.totalAmount;
      });
      return {
        Date: `${new Date(month).toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        })}`,
        Earning: price
      };
    } else {
      return {
        Date: `${new Date(month).toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        })}`,
        Earning: 0,
      };
    }
  });

  return result;
};
