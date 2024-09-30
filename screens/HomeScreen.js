import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
  } from "react-native";
    //VIGTIG!
    import React, { useEffect, useState } from "react";
    import AsyncStorage from "@react-native-async-storage/async-storage";

    import ChatFaceData from "../services/ChatFaceData";

    
    export default function HomeScreen({navigation}) {
        //Håndtere ChatBotValg
          const [chatFaceData, setChatFaceData] = useState([]);
          const [selectedChatFace, setSelectedChatFace] = useState([]);
        
          //Håndtere valg af chatbot
          useEffect(() => {
            setChatFaceData(ChatFaceData);
            checkFaceId();
          }, []);
        
          //Håndere valg af chatbot (Gemmer valg)
          const checkFaceId = async () => {
            const id = await AsyncStorage.getItem("chatFaceId");
            id
              ? setSelectedChatFace(ChatFaceData[id])
              : setSelectedChatFace(ChatFaceData[0]);
          };
        
          //Håndtere valg af chatbot (Skifte mellem dem)
          const onChatFacePress = async (id) => {
            setSelectedChatFace(ChatFaceData[id - 1]);
            await AsyncStorage.setItem("chatFaceId", (id - 1).toString());
          };
        
          return (
            //Vi laver de to views til at rappe resten af frontend
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <View style={{ alignItems: "center" }}>
                {/*Titel*/}
                <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30 }]}>
                  Hello,
                </Text>
                {/*Undertitel - Bot Intro*/}
                <Text
                  style={[
                    { color: selectedChatFace?.primary },
                    { fontSize: 30, fontWeight: "bold" },
                  ]}
                >
                  I am {selectedChatFace.name}
                </Text>
                {/*Bot Image*/}
                <Image
                  source={{ uri: selectedChatFace.image }}
                  style={{ height: 150, width: 150, marginTop: 20 }}
                />
                {/*Besked*/}
                <Text style={{ marginTop: 30, fontSize: 25 }}>How Can I help you?</Text>
                
                {/*Valg af bots*/}
                <View
                  style={{
                    marginTop: 20,
                    backgroundColor: "#F5F5F5",
                    alignItems: "center",
                    height: 110,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                    {/*Liste med de forskellige bots*/}
                  <FlatList
                    data={chatFaceData}
                    horizontal={true}
                    renderItem={({ item }) =>
                      item.id != selectedChatFace.id && (
                        <TouchableOpacity
                          style={{ margin: 15 }}
                          onPress={() => onChatFacePress(item.id)}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{ width: 40, height: 40 }}
                          />
                        </TouchableOpacity>
                      )
                    }
                  />
                  <Text style={{ marginTop: 5, fontSize: 17, color: "#B0B0B0" }}>
                    Choose Your Fav ChatBuddy
                  </Text>
                </View>
                {/*Knap til chatten*/}
                <TouchableOpacity
                  style={[
                    { backgroundColor: selectedChatFace.primary },
                    {
                      marginTop: 40,
                      padding: 17,
                      width: Dimensions.get("screen").width * 0.6,
                      borderRadius: 100,
                      alignItems: "center",
                    },
                  ]}
                  onPress={() => navigation.navigate("chat")}
                >
                  <Text style={{ fontSize: 16, color: "#fff" }}>Let's Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      