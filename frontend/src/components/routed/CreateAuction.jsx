import { Box, Button, Center, Group, Modal, NumberInput, Text, Textarea, TextInput  } from '@mantine/core'
import React from 'react'
import { useState } from 'react'
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { useRef } from 'react';
import { useCallback } from 'react';
import axios from 'axios';

function CreateAuction() {


    const [localProd , setLocalProd] = useState([])

    const [opened , setOpened] = useState(false)

    const localDel = (ind) =>{
        setLocalProd(localProd.filter((ele , index) => index != ind))
    }

    const CreateAuction = async()=>{
            const payload = {
                auctionName : Name,
                auctionDescription : Desc,
                startDate : valueDate[0].toISOString().slice(0,10),
                endDate : valueDate[1].toISOString().slice(0,10),
                auctionHost : Host,
                Status : 'Upcoming',
                productArray : localProd

            }
            // const resp = await axios.post('https://product-api-six.vercel.app/addAuction', payload)
            // if(resp.status == 201){
            //     setName('')
            //     setDesc('')
            //     setHost('')
            //     setValueN('')
            //     setValueD('')
            //     // Pref.current.value = ''
            //     setValueDate([new Date(),new Date()])
            //     setLocalProd([])
            // }
            
            // console.log(resp , 'payload')
            console.log(payload)

    }

    const [Name , setName] = useState('')
    const [Host , setHost] = useState('')
    const [Desc , setDesc] = useState('')
    const [valueN, setValueN] = useState('');
    const [valueD, setValueD] = useState('');
    const [valueP, setValueP] = useState(0);
    const [valueDate , setValueDate] = useState([new Date() , new Date()])

    // const Pref = useRef()
    const SRef = useRef()
    const ERef = useRef()

    const handleAdd = ()=>{
        const prod = {
          productName : valueN,
          basePrice : valueP,
          productDescription : valueD,
          index : localProd.length
        }
    
        setLocalProd(localProd => [...localProd , prod])
        setValueN('')
        setValueD('')
        setValueP(0)
        console.log(prod)
        setOpened(false)
    
      }


    return (
        <Box p='md' m={0} style={{backgroundColor : '#04293a' , color : '#ecb365' , height : '100vh'}}>
            <Group m='md' style={{marginLeft : '20%', border : '1px solid red' , padding : '10px' , display : 'inline-block' , borderRadius : '20px' }}>
                <Text color='#ecb365' size='lg' m='sm' style={{display : 'inline-block'}}>
                    Auction Name :</Text>
                <TextInput value={Name} onChange={(event) => setName(event.target.value)} style={{display : 'inline-block'}}/>
            </Group>

            <Group m='md' style={{border : '1px solid red' , padding : '10px' , display : 'inline-block' , borderRadius : '20px' }}>
                <Text color='#ecb365' size='lg' m='sm' style={{display : 'inline-block'}}>
                    Auction Host :</Text>
                <TextInput value={Host} onChange={(event) => setHost(event.target.value)} style={{display : 'inline-block'}}/>
            </Group>

            <Group m='md' style={{marginLeft : '20%', border : '1px solid red' , padding : '10px', minWidth : '60%' , display : 'inline-block' , borderRadius : '20px' }}>
                <Text color='#ecb365' size='lg' m='sm' style={{display : 'inline-block'}}>
                   Pick Date :</Text>
                <DateRangePicker value={valueDate} onChange={setValueDate} style={{display : 'inline-block' , minWidth : '60%'}}/>
            </Group>

            <Group m='md' style={{width:'60%', marginLeft : '20%', border : '1px solid red' , padding : '10px' , display : 'inline-block' , borderRadius : '20px' }}>
                <Text color='#ecb365' size='lg'style={{display : 'inline-block'}}>
                    Description :</Text>
                <Textarea value={Desc} onChange={(event) => setDesc(event.target.value)} autosize style={{ minWidth : '80%'}}/>
            </Group>
            
            <Box style={{display : 'block' , textAlign : 'center'}} p='md'>
                <Button onClick={()=>setOpened(true)} style={{backgroundColor : '#08393a'}}><Text color = '#ecb365'>Add New Product</Text></Button>
            </Box>

            <Modal  
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add Product Details!"
            >
                <div>
                    <TextInput label='Product Name' required value={valueN} onChange={(event) => setValueN(event.target.value)} />
                    <NumberInput label='Base Price' required value={valueP} onChange={(val) => setValueP(val)}/>

                    <Textarea label='Description' required value={valueD} autosize onChange={(event) => setValueD(event.target.value)}/>
                    <Center>
                        <Button m='md' ><Text color='white' onClick={()=>{handleAdd()}}>Submit</Text></Button>
                    </Center>
                </div>
            </Modal>
            {localProd.map((ele)=><Box p='md' style={{backgroundColor : 'yellow'}}>
                <h2>{ele.productName}</h2>
                <Text>{ele.productDescription}</Text>
                <Text style={{display:'inline-block'}}>Base Price : {ele.basePrice}</Text>
                <Button onClick={()=>{localDel(ele.index)}} style={{display:'inline-block' , float:'right'}}>Delete</Button>

            </Box>)}
            <div style={{textAlign : 'center'}}>
                <Button style={{marginBottom : '50px'}} onClick={()=>CreateAuction()}><Text style={{color:'white'}}>Create Auction</Text></Button>
            </div>
        </Box>
      )
}

export default CreateAuction

