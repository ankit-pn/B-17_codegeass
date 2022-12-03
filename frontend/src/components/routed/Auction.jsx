import { Badge, Box, Button, Center, Group, Text, Title } from '@mantine/core'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../utils/ProductCard'

function Auction() {
  const params = useParams()

  const admin = window.location.pathname.includes('/admin')

  console.log(params , window.location.pathname)

  const changeStatus = async()=>{
    console.log(data , 'DATATTATATTATATA')
    const resp = await axios.post('https://product-api-six.vercel.app/changeApproveStatus',{
        apiId : 'admin',
        newStatus : !data.approveStatus,
        auctionId: params.aid
    })
    async function fetchDetails(){
        const resp = await axios.post('https://product-api-six.vercel.app/getAuctionDetailByAuctionId',{
            auctionId : params.aid
        })
        
        setPdata([])
        setData(resp.data.auctionDetails[0])

        for(const x of resp.data.auctionDetails[0]['productIds']){
            const res = await axios.post('https://product-api-six.vercel.app/getProductDetailByProductId',{
                productId : x
            })
            console.log(res.data.productDetails[0] , 'prodDEtail')
            setPdata(pdata => [...pdata ,res.data.productDetails[0] ])
            
        }
        setLoading(false)
    }

    fetchDetails()
  }

  const [data , setData] = useState('')
  const [pdata ,setPdata] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
    async function fetchDetails(){
        const resp = await axios.post('https://product-api-six.vercel.app/getAuctionDetailByAuctionId',{
            auctionId : params.aid
        })
        console.log(resp.data.auctionDetails , 'aaaaaaaaa')
        
        setData(resp.data.auctionDetails[0])

        for(const x of resp.data.auctionDetails[0]['productIds']){
            const res = await axios.post('https://product-api-six.vercel.app/getProductDetailByProductId',{
                productId : x
            })
            console.log(res.data.productDetails[0] , 'prodDEtail')
            setPdata(pdata => [...pdata ,res.data.productDetails[0] ])
            
        }
        setLoading(false)
    }

    fetchDetails()
    console.log(pdata , 'pdata')

    return ()=>{
        setPdata([])
        setData('')
    }
    

  },[])

//   console.log(params)
if(loading){
    return (<div><p>Loading...</p></div>)
}
console.log( data['approveStatus'] , 'data')

const st = (data['approveStatus']) ? 'Accepted' : 'Under Verification'
    return (
    <Box style={{backgroundColor : '#C7D6D4' , padding : '20px' , height : '100%' }}>
        <h1 style={{color : '#00867c' , textAlign : 'center'}}>{data['auctionName']}</h1>
        <Text p='md' color='#000d0c'>{data['auctionDescription']}</Text>
        <Text color='#000d0c'p='md' style={{textAlign:'center'}} variant='filled'>Ends At : {data['endDate']}</Text>
        {admin && <Center><Button onClick={()=>{changeStatus()}} color='green'>Change Status</Button><Title mx='md' order={2} color='green'>{st} </Title> </Center>}
        {pdata.map((ele)=><ProductCard bids={ele['totalBid']} aid={ele['auctionId']} pid={ele['productId']} name={ele['productName']} price={ele['basePrice']} desc={ele['productDescription']}  />)}
        {/* <ProductCard name='NANNA' price='34' desc='lorem scvbsvb'  /> */}
    </Box>
  )
}

export default Auction