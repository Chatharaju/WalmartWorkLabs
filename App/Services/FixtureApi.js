
export default {
  // Functions return fixtures
  getCars: () => {
    console.tron.log("fixture")
    return {
      ok: true,
      data: require('../Fixtures/getCars.json')
    }
  },
  
}
