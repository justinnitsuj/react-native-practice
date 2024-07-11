import { request, gql } from 'graphql-request';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const masterurl = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cly247ssf05mc07w85c9i5p12/master'

const getSlider = async () => {
    const query = gql` 
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
    `
    const result = await request(masterurl, query);
    return result;
}

const getCategories = async () => {
    const query = gql`
    query GetCategory {
        categories {
            id
            name
            icon {
            url
            }
        }
    }
    `
    const result = await request(masterurl, query);
    return result;
}
const getBusinesslist = async () => {
    const query = gql`
    query getBusinesslist {
        businesslists {
            id
            name
            email
            contactPerson
            category {
                name
            }
            address
            about
            images {
                url
            }
        }
    }
    `
    const result = await request(masterurl, query);
    return result;
}

const getBusinesslistByCategory = async (category) => {
    const query = gql`
    query getBusinesslist {
        businesslists(where: {category: {name: "`+category+`"}}) {
            id
            name
            email
            contactPerson
            category {
                name
            }
            address
            about
            images {
                url
            }
        }
    }
    `
    const result = await request(masterurl, query);
    return result;
}

const createBooking = async (data)=>{
    const mutationquery = gql`
   mutation createBooking {
            createBooking(
                data: {
                    bookingStatus: Booked,
                    businesslist: { connect: { id: "${data.businessId}" } },
                    date: "${data.date}",
                    time: "${data.time}",
                    userEmail: "${data.userEmail}",
                    userName: "${data.userName}",
                   
                }
            ) {
                id
            }
            publishManyBookings (to: PUBLISHED){
                count
            }
        }
    `
    const result = await request(masterurl, mutationquery);
    return result;
}

const getUserBooking = async (userEmail)=>{
    const query = gql`
    query GetUserBookings {
  bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+userEmail+`"}) {
    time
    userEmail
    userName
    bookingStatus
    date
    id
    businesslist {
      id
      images {
        url
      }
      name
      address
      contactPerson
      email
      about
    }
  }
}
    `
    const result = await request(masterurl, query);
    return result;
}

export default {
    getSlider,
    getCategories,
    getBusinesslist,
    getBusinesslistByCategory,
    createBooking,
    getUserBooking
}