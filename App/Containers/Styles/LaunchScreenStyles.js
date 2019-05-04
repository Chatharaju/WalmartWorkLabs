import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardCard: {
    height: 100, 
    width: width * 0.9,
    borderBottomWidth: 1,
    marginTop: 10,
    // justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  pickerView: {
    flex: 0.5,
    flexDirection: "row"
  },
  dataView: {
    flex: 1.5
  },
  imageStyles: {
    width: 50,
    height: 50
  },
  imageView: {
    marginRight: 30,
  },
  text: {
    fontSize: 12,
    marginBottom: 15,
  },
  detialsView: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  buyButtonView: {
    marginLeft: 50,
    borderWidth: 1,
    borderRadius: 10,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  }
})
