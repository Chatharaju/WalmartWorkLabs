import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, FlatList, View, TouchableOpacity, Image, Alert , Picker} from 'react-native'
import { Images } from '../Themes'
import GetCarsActions from '../Redux/GetCarsRedux'
import CarsData from "../Fixtures/getCars.json"

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {

  state = {
    allCars: {},
    sortItem: "",
  }

  getCarsList = this.getCarsList.bind(this);
  renderCar= this.renderCar.bind(this);
  carDetails=this.carDetails.bind(this);
  sortData=this.sortData.bind(this);

  componentDidMount() {
    this.getCarsList
  }

  getCarsList () {
    this.props.getCarsApi()
  }

  componentWillReceiveProps(newProps) {
    if (this.props.cars !== newProps.cars) {
      this.setState({allCars: newProps.cars.cars})
    }
  }
  carDetails(item) {
    // this is different type of api calling, just made two different styles to shows you guys.
    // just commented out.
    // this.fetchCarAvailability()
    Alert.alert(
      'Car Availability',
      item.availability,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  async fetchCarAvailability() {
    try {
      let response = await fetch(
        `http://myfancycar/availability?id=${item.id}`,
      );
      let responseJson = await response.json();
      return responseJson.available;
    } catch (error) {
      console.log(error);
    }
  }

  sortData() {
    if(this.state.sortItem === "name") {
      return CarsData.cars.sort((a,b)=> a.name > b.name)
    } else if (this.state.sortItem === "availability") {
      return CarsData.cars.sort((a,b)=> a.availability > b.availability)
    } else {
      return CarsData.cars
    }
  }

  renderCar({item}) {
    // console.tron.log("item", item)
    return(
      <TouchableOpacity onPress={() => this.carDetails(item)} style={styles.cardCard}>
        <View style={styles.imageView}>
          <Image
            source={{ url: item.img }}
            style={styles.imageStyles}
          />
        </View>
        <View style={styles.detialsView}>
          <View>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.make}</Text>
            <Text style={styles.text}>{item.model}</Text>
          </View> 
          {item.availability === "In Delearship" && (
            <TouchableOpacity style={styles.buyButtonView}>
              <Text>Buy</Text> 
          </TouchableOpacity>
          )} 
        </View>
        
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={style=styles.pickerView}>
          <Picker
              selectedValue={this.state.sortItem}
              style={{height: 50, width: 100}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({sortItem: itemValue})
            }>
            <Picker.Item label="" value="" />
            <Picker.Item label="Name" value="name" />
            <Picker.Item label="Availability" value="availability" />
          </Picker>
        </View>
        <View style={styles.dataView}>
          <Text>Cars List and Availability</Text>
        <View>
          <FlatList
            data={this.sortData()} //In an ideal world, should use it from state or props after an api call
            extraData={this.state}
            renderItem={this.renderCar}
            // onEndReached={this.lazyLoadListings}
            // onMomentumScrollBegin={this.setEndReachedFlag}
            // ListEmptyComponent={this.getEmptyListComponent}
          />
        </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.getCars.cars
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCarsApi: () => dispatch(GetCarsActions.getCarsRequest())}
}
export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
