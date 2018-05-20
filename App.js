import React from 'react';
 
import { 
  StyleSheet, justify, 
  Text, View, Alert,
  ImageBackground, 
  Image, Button, 
  TextInput, 
  FlatList, List, 
  ListItem, ScrollView,
  TouchableOpacity,
  ActivityIndicator, ListView,
  } from 'react-native';
//import MenuItem from '.src/comp/MenuItem';
import { Container, Content } from 'native-base'
import { StackNavigator } from 'react-navigation';
const postk = 'http://mhs.rey1024.com/appmobile/D1615051107/kirimData.php';
const getk = 'http://mhs.rey1024.com/appmobile/D1615051107/getData.php';

async function getkomen(){
    try {
          let response = await fetch(getk);
          let responseJson = await response.json();
          return responseJson.data; // list komentar
       } catch (error){

          console('Error')
          }
}
async function postkomen(d){

   /* try {
          let response = await fetch(postk,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(params)
          });
          let responseJson = await response.json();
          return responseJson.result; // list komentar
       } catch (error){
          console('Error is ')
          }*/

    fetch('http://mhs.rey1024.com/appmobile/D1615051107/kirimData.php', {
      method: 'POST',
      headers: { 
               'Accept': 'application/json',
               'Content-Type': 'application/json' 
               },
      body: JSON.stringify({nama: d.nama, idfilm: "2222", komentar: d.komentar})
    })
    .then((response) => JSON.stringify(response.json())) 
    .then((responseData) => { console.log("response: " + responseData); })
    .catch((err) => { console.log(err); });

}





class HomeScreen extends React.Component {
	constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserEmail: '',
      UserPassword: ''
 
    }
 
  }
 
UserLoginFunction = () =>{
 
 const { uname }  = this.state ;
 const { pass }  = this.state ;
 
 
fetch('https://senapati-2018.000webhostapp.com/login.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    username: uname,
 
    password: pass
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched
       if(responseJson === 'Data Matched')
        {

            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('classCari', {});

          //Alert.alert('success');
        }
        else{

          Alert.alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
      });
 
 
  }

  render() {
      return(
        <ImageBackground
          
          style={styles.container}>
		  
			<View style={styles.Top}>
			

			

				
		</View>
				

              <View style={styles.header}>
                  <Text style={styles.textHeader}>Login</Text>
              </View>

              <View style={styles.sleding}>
                    <View style={{padding: 10, margin: 20}}>
                        <TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan User"
						  onChangeText={uname => this.setState({uname})}
                          keyboardType = 'numeric'
                        />

                        <TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan  Pass"
                          onChangeText=   {pass => this.setState({pass})}
                          keyboardType = 'numeric'
                        />

                        <Button title="Login" onPress={this.UserLoginFunction} color="#2196F3" />
						<Button
                          onPress={()=>{this.props.navigation.navigate('Daftar');}}
                            
                          
                          title="daftar"
                          accessibilityLabel="Klik untuk menghitung"
                        />
						
                    </View>
              </View>

                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>
                      <View style={styles.ListItem}>
                        <Text style={styles.ListFirst} 

                            
                          onPress={() => {
                            this.props.navigation.navigate('Details', {

                              otherParam: item.title,
                              story: item.storyline,
                              rating: item.rating,
                              id: item.imdb_id,
                              poster: item.large,
                            });
                          }}
                      

                         >{item.title  }
                         
                        </Text>
                      </View>
                    }
                />

          <View style={styles.footer}>
              <Text style={styles.textFooter}>{this.otherParam}Copyright2018 by Made Kevin Ihza Mahendra</Text>
          </View>

        </ImageBackground>
      );
  }
}

class Cari extends React.Component {


  state = {
    data:[],
  };
  //i="denpasar"; 
  componentWillMount(){
    this.fetchData();

  }
    fetchData = async () => {

      const response = await fetch("http://www.theimdbapi.org/api/find/movie?title="
        +this.state.judul+
        "&year="+this.state.tahun
        );
      const json = await response.json();
      this.setState({ 
       data:json
      });
    };



  render() {
      return(
        <ImageBackground
          
          style={styles.container}>
		  
			<View style={styles.Top}>
			

			
				<View style={{alignItems: 'flex-end'}}>
				
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Details');}}>
          <Image
					  style={styles.imgtop}
					  
					  source={require('./src/images/list-512.png')}

					/>
        </TouchableOpacity>
				
					
				</View>
				
		</View>
				

              <View style={styles.header}>
                  <Text style={styles.textHeader}>Film Favorit Bulan Ini</Text>
              </View>

              <View style={styles.sleding}>
                    <View style={{padding: 10, margin: 20}}>
                        <TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan Judul"
                          onChangeText=   {(judul)=>this.setState({judul})}
                          keyboardType = 'numeric'
                        />

                        <TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan  Tahun"
                          onChangeText=   {(tahun)=>this.setState({tahun})}
                          keyboardType = 'numeric'
                        />

                        <Button
                          onPress={this.componentWillMount = this.componentWillMount.bind(this)
                            
                          }
                          title="CARI"
                          accessibilityLabel="Klik untuk menghitung"
                        />

                    </View>
              </View>

                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>
                      <View style={styles.ListItem}>
                        <Text style={styles.ListFirst} 

                     

                         >{item.name}
                         
                        </Text>
                      </View>
                    }
                />

          <View style={styles.footer}>
              <Text style={styles.textFooter}>{this.otherParam}Copyright2018 by Made Kevin Ihza Mahendra</Text>
          </View>

        </ImageBackground>
      );
  }
}


class DetailsKontak extends React.Component {

  render() {
      return(
        <ImageBackground
          
          style={styles.container}>
		  
			<View style={styles.Top}>
			

			
				<View style={{alignItems: 'flex-end'}}>
				
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Nobar');}}>
          <Image
					  style={styles.imgtop}
					  
					  source={require('./src/images/list-512.png')}

					/>
        </TouchableOpacity>
				
					
				</View>
				
		</View>
				

              <View style={styles.header}>
                  <Text style={styles.textHeader}>Kontak</Text>
              </View>

              <View style={{flex:1, alignItems: 'center'}}>
                    <View style={{padding: 10, margin: 20}}>
                        <Text style={{fontSize:30}} >EMAIL = KEFINE.IHZA@GMAIL.COM</Text>

                    </View>
              </View>


          <View style={styles.footer}>
              <Text style={styles.textFooter}>Copyright2018 by Made Kevin Ihza Mahendra</Text>
          </View>

        </ImageBackground>
      );
  }
}


class DetailsPetunjuk extends React.Component {

  render() {
      return(
        <ImageBackground
          
          style={styles.container}>
		  
			<View style={styles.Top}>
			

			
				<View style={{alignItems: 'flex-end'}}>
				
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Nobar');}}>
          <Image
					  style={styles.imgtop}
					  
					  source={require('./src/images/list-512.png')}

					/>
        </TouchableOpacity>
				
					
				</View>
				
		</View>
				

              <View style={styles.header}>
                  <Text style={styles.textHeader}>PETUNJUK</Text>
              </View>

              <View style={{flex:1, alignItems:'center'}}>
                    <View style={{padding: 10, margin: 20}}>
                        <Text style={{fontSize:30}} >APLIKASI INI MENGGUNAKAN JARINGAN INTERNET</Text>

                    </View>
              </View>


          <View style={styles.footer}>
              <Text style={styles.textFooter}>{this.otherParam}Copyright2018 by Made Kevin Ihza Mahendra</Text>
          </View>

        </ImageBackground>
      );
  }
}



class DetailsScreen extends React.Component {

  render() {
      return(
        <ImageBackground
          
          style={styles.container}>
		  
			<View style={styles.Top}>
			

			
				<View style={{alignItems: 'flex-end'}}>
				
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate('classCari');}}>
          <Image
					  style={styles.imgtop}
					  
					  source={require('./src/images/list-512.png')}

					/>
        </TouchableOpacity>
				
					
				</View>
				
		</View>
		
		<View style={styles.mainmenuBg}>
			<View style={styles.menuBg}>
			
				<View style={styles.menu1}>
				<TouchableOpacity style={{width:'100%', height:'100%'}} onPress={()=>{this.props.navigation.navigate('classCari');}}>
					<ImageBackground
                          source={require('./src/images/profil.png')}
                          style={{height:'100%',width:'100%'}}>
						  
					</ImageBackground>
					</TouchableOpacity>
					<Text style={{textAlign: 'center',fontSize:50,fontWeight: 'bold',color:'black'}}>Profil</Text>
				</View>
								<View style={styles.menu1}>
				<TouchableOpacity style={{width:'100%', height:'100%'}} onPress={()=>{this.props.navigation.navigate('Nobar');}}>
					<ImageBackground
                          source={require('./src/images/acara.png')}
                          style={{height:'100%',width:'100%'}}>
						  
					</ImageBackground>
					</TouchableOpacity>
					<Text style={{textAlign: 'center',fontSize:50,fontWeight: 'bold',color:'black'}}>Nobar</Text>
				</View>
								<View style={styles.menu1}>
				<TouchableOpacity style={{width:'100%', height:'100%'}} onPress={()=>{this.props.navigation.navigate('Kontak');}}>
					<ImageBackground
                          source={require('./src/images/kontak.png')}
                          style={{height:'100%',width:'100%'}}>
						  
					</ImageBackground>
					</TouchableOpacity>
					<Text style={{textAlign: 'center',fontSize:50,fontWeight: 'bold',color:'black'}}>Kontak</Text>
				</View>
								<View style={styles.menu1}>
				<TouchableOpacity style={{width:'100%', height:'100%'}} onPress={()=>{this.props.navigation.navigate('Petunjuk');}}>
					<ImageBackground
                          source={require('./src/images/petunjuk.png')}
                          style={{height:'100%',width:'100%'}}>
						  
					</ImageBackground>
					</TouchableOpacity>
					<Text style={{textAlign: 'center',fontSize:50,fontWeight: 'bold',color:'black'}}>Petunjuk</Text>
				</View>

				
				
			</View>
		</View>	
              

          <View style={styles.footer}>
              <Text style={styles.textFooter}>{this.otherParam}Copyright2018 by Made Kevin Ihza Mahendra</Text>
          </View>

        </ImageBackground>
      );
  }
}

class DetailsNobar extends React.Component {
	

  state = {
    data:[],
  };
  //i="denpasar"; 
  componentWillMount(){
    this.fetchData();

  }
    fetchData = async () => {

      const response = await fetch("https://senapati-2018.000webhostapp.com/ListNobar.php"
        );
      const json = await response.json();
      this.setState({ 
       data:json
      });
    };


  render() {
      return(
        <ImageBackground
          
          style={styles.container}>
		  
			<View style={styles.Top}>
			

			
				<View style={{alignItems: 'flex-end'}}>
				
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Details');}}>
          <Image
					  style={styles.imgtop}
					  
					  source={require('./src/images/list-512.png')}

					/>
        </TouchableOpacity>
				
					
				</View>
				
		</View>
		
		
			<View style={styles.sleding}>
                    <View style={{padding: 10, margin: 20}}>
                       
					<FlatList
						data={this.state.data}
						renderItem={({item}) =>
						  <View style={styles.ListItem}>
							<Text style={styles.ListFirst} 
                     

                         >Deskripsi = {item.deskripsi  }
                         
                        </Text>
                      </View>
                    }
                />	
					   
					   
					   
					   
					   
                        <Button
                          onPress={()=>{this.props.navigation.navigate('TambahNobar');}}
                            
                          
                          title="Tambah"
                          accessibilityLabel="Klik untuk menghitung"
                        />

                    </View>
              </View>
		<View style={styles.mainmenuBg}>	
		</View>	
              

          <View style={styles.footer}>
              <Text style={styles.textFooter}>{this.otherParam}Copyright2018 by Made Kevin Ihza Mahendra</Text>
          </View>

        </ImageBackground>
      );
  }


}



class DetailsDaftar extends React.Component {
	constructor(props) {
 
    super(props)
 
    this.state = {
	  Susername: '',
      Snama: '',
      Semail: '',
	  Spassword: '',
 
    }
 
  }
 
daftarFunction = () =>{
 
 const { username }  = this.state ;
 const { nama }  = this.state ;
 const { email }  = this.state ;
 const { password }  = this.state ;
 
 
fetch('https://senapati-2018.000webhostapp.com/daftar.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    usernamej: username,
    namaj: nama,
	emailj: email,
	passwordj: password,
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched
       if(responseJson === 'Data Matched')
        {

            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('Home', {});

          //Alert.alert('success');
        }
        else{

          Alert.alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
      });
 
 
  }

  render() {
      return(
        <ImageBackground
          
          style={styles.container}>
		  
			<View style={styles.Top}>
			

			
				<View style={{alignItems: 'flex-end'}}>
				
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Nobar');}}>

        </TouchableOpacity>
				
					
				</View>
				
		</View>
		
		
			<View style={styles.sleding}>
                    <View style={{padding: 10, margin: 20}}>
                        <TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan Username"
                          onChangeText=   {(username)=>this.setState({username})}
                          keyboardType = 'numeric'
                        />

                        <TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan  Nama"
                          onChangeText=   {(nama)=>this.setState({nama})}
                          keyboardType = 'numeric'
                        />
						
						<TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan  email"
                          onChangeText=   {(email)=>this.setState({email})}
                          keyboardType = 'numeric'
                        />
						
						<TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan  Passwordi"
                          onChangeText=   {(password)=>this.setState({password})}
                          keyboardType = 'numeric'
                        />
						

                        <Button
                          onPress={() => this.daftarFunction(View)}
                            
                          
                          title="DAFTAR"
                          accessibilityLabel="Klik untuk menghitung"
                        />

                    </View>
              </View>
		<View style={styles.mainmenuBg}>	
		</View>	
              

          <View style={styles.footer}>
              <Text style={styles.textFooter}>Copyright2018 by Made Kevin Ihza Mahendra</Text>
          </View>

        </ImageBackground>
      );
  }


}



class DetailsTambahNobar extends React.Component {
	constructor(props) {
 
    super(props)
 
    this.state = {
 
      Snama: '',
      Sjudul: '',
	  Swakut: '',
	  Sdeskripsi: '',
 
    }
 
  }
 
acaraFunction = () =>{
 
 const { nama }  = this.state ;
 const { judul }  = this.state ;
 const { waktu }  = this.state ;
 const { deskripsi }  = this.state ;
 
 
fetch('https://senapati-2018.000webhostapp.com/acara.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    namaj: nama,
    judulj: judul,
	waktuj: waktu,
	deskripsij: deskripsi,
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched
       if(responseJson === 'Data Matched')
        {

            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('classCari', {});

          //Alert.alert('success');
        }
        else{

          Alert.alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
      });
 
 
  }

  render() {
      return(
        <ImageBackground
          
          style={styles.container}>
		  
			<View style={styles.Top}>
			

			
				<View style={{alignItems: 'flex-end'}}>
				
				<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Nobar');}}>
          <Image
					  style={styles.imgtop}
					  
					  source={require('./src/images/list-512.png')}

					/>
        </TouchableOpacity>
				
					
				</View>
				
		</View>
		
		
			<View style={styles.sleding}>
                    <View style={{padding: 10, margin: 20}}>
                        <TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan Nama"
                          onChangeText=   {(nama)=>this.setState({nama})}
                          keyboardType = 'numeric'
                        />

                        <TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan  Judul Film"
                          onChangeText=   {(judul)=>this.setState({judul})}
                          keyboardType = 'numeric'
                        />
						
						<TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan  Hari"
                          onChangeText=   {(waktu)=>this.setState({waktu})}
                          keyboardType = 'numeric'
                        />
						
						<TextInput style = {{height: 40, fontSize:18, color: '#212121'}}
                        
                          placeholder="   Masukkan  Deskripsi"
                          onChangeText=   {(deskripsi)=>this.setState({deskripsi})}
                          keyboardType = 'numeric'
                        />
						

                        <Button
                          onPress={() => this.acaraFunction(View)}
                            
                          
                          title="CARI"
                          accessibilityLabel="Klik untuk menghitung"
                        />

                    </View>
              </View>
		<View style={styles.mainmenuBg}>	
		</View>	
              

          <View style={styles.footer}>
              <Text style={styles.textFooter}>{this.otherParam}Copyright2018 by Made Kevin Ihza Mahendra</Text>
          </View>

        </ImageBackground>
      );
  }


}





const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
	Nobar: {
	  screen: DetailsNobar,
	},
	classCari: {
	  screen: Cari,
	},
	TambahNobar: {
	  screen: DetailsTambahNobar,
	},
	Daftar: {
	  screen: DetailsDaftar,
	},
	Kontak: {
	  screen: DetailsKontak,
	},
	Petunjuk: {
	  screen: DetailsPetunjuk,
	},
  },
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: '100%',
      height: '100%',
  },
  overlayContainer: {
      flex: 1,
      backgroundColor: 'rgba(1,1,1, .35)'
  },
  header:{
//    backgroundColor: 'rgba(255, 255, 255, .100)',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'flex-end'
  },
  Textx: {
    fontSize: 20,
    color: '#212121',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },
  textHeader: {
      fontSize: 28 ,
      color: '#212121',
      borderWidth: 2,
      borderColor: '#212121',
      padding: 20,
      paddingLeft: 80,
      paddingRight: 80,
      backgroundColor: 'rgba(255, 255, 255, .1)'
  },
  footer:{
    backgroundColor:'black',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  textFooter: {
    fontSize: 15 ,
    color: '#fff',
  },
  menuContainer: {

      height: '30%',
      flexDirection: 'row',
      flexWrap: 'wrap',

  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '40.6666%',
    padding: 15,
    backgroundColor: '#ccc',
    borderColor: '#000',
    borderWidth: 2,
  },
  Image: {
    width: '100%',
    height: '100%',
    //opacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    //borderWidth: 1,
  },
  sleding: {
      marginTop: 30,

  },
  g1: {
    width: '100%',
    height: 250,
    opacity: 0.9,
    borderColor: '#fff',
    borderWidth: 3,
  },
  ListItem: {
        backgroundColor:'#ffff',
        marginTop: 5,
        flex: 1,  
        marginRight: 20,
        marginLeft: 20,
        height: 50
    },
  ListFirst: {
    marginLeft: 20,
    marginTop: 10,
      alignItems: 'center',
      fontSize: 20,
     },
  Top: {
	height: 100,
	backgroundColor: '#ffff',

     },
	   imgtop: {
width: 80, 
height: 80,
marginRight: 40,
     },
mainmenuBg:{
	flex:1,
	alignItems: 'center',
	marginTop:50,
},
  menuBg: {
      height:600,
      flexDirection: 'row',
      flexWrap: 'wrap',
	  width:600,
	  margin:100,
  },
  menu1: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '50%',
	padding:30,
	

  //  backgroundColor: '#ccc',
 //   borderColor: '#000',
  //  
  },
  
  
  
});