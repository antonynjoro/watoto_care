"use server"
const fetchCities = async (query) => {
  try {
    const cities = await prisma.canadaCities.findMany({
      where: {
        cityName: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
  
   return cities
  } catch (error) {
    console.log(error);
  }
};
