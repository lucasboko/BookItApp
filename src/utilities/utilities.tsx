import { GetEventsProps, EventsProps, UserProps, RegisterInputProps, CreateUserProps, LoginInputProps, LoggedInUser, EventInputProps } from '../types'
import { find } from 'lodash';

const API_URL = import.meta.env.VITE_API_URL;

export const queryFetch = (query: string, variables?: object) => {

    return fetch(
        `${API_URL}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(
                {
                    query,
                    variables
                }
            ),
        }
    ).then((resp) => resp.json())
        .then(data => data)
        .catch((respErr) => console.log(respErr));

}


export const checkEmailDuplicate = async (email: string): Promise<boolean> => {

    const query = `{ emailFound(email: "${email}" )  { status email } }`

    const res = await queryFetch(query)

    if (res && res.data.emailFound.status === 200) {
        return true
    } else return false
}

const filterEvents =
    (
        place: google.maps.places.PlaceResult | null,
        range: number,
        events: EventsProps[] | [],
        geometry: google.maps.GeometryLibrary | null
    ) => {

        let filtered: EventsProps[] = events
        if (place?.geometry?.location && geometry && events) {
            filtered = events.filter(item => {

                const from = { lat: place?.geometry?.location?.lat() ?? 0, lng: place?.geometry?.location?.lng() ?? 0 }
                const to = { lat: item.location.lat ?? 0, lng: item.location.lng ?? 0 }

                const distance = geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(from),
                    new google.maps.LatLng(to)
                )

                if (distance <= range * 1000) {
                    return item
                }

            })
        }

        return filtered || []
    }

export const getEvents = async (params: GetEventsProps): Promise<EventsProps[] | []> => {

    const query = `
        {
            events {
                _id
                name
                description
                image
                price
                tickets
                arena
                location { lat lng }
                start_date
                end_date
            }
        }
    `

    const res = await queryFetch(query)
    if (res.data) {
        // return res.data.events
        return filterEvents(
            params.selectedPlace,
            params.range,
            res.data.events,
            params.geometry
        )
    } else {
        return []
    }
}

export const createUser = async (user: RegisterInputProps): Promise<CreateUserProps> => {

    const query = `
        mutation CreateUser ($input: RegisterInput){
            register(registerInput: $input) {
                status email firstname lastname
            }
        }
    `

    const res = await queryFetch(query, { input: user })
    if (res && res.data.register.status === 200) {
        return res.data.register
    } else return res.data.register.errors

}


export const setAuth = (value: LoggedInUser) => {
    sessionStorage.setItem('logged_in_user', JSON.stringify(value));

}

export const clearAuth = () => sessionStorage.removeItem("logged_in_user");


export const authenticate = async (user: LoginInputProps): Promise<LoggedInUser> => {

    const query = `
        {
            login(loginInput: {
            email: "${user.email}"
            password: "${user.password}"
            }) { status token _id firstname lastname email } 
        }
    `

    const res = await queryFetch(query)

    if (res && res.data.login.status === 200) {
        return res.data.login
    } else return res.data.login.errors

}


export const getLoggedInUser = () => {
    const loggedUser = JSON.parse(sessionStorage.getItem('logged_in_user') || '{}')

    if (!Object.keys(loggedUser).length) {
        return Object.keys(loggedUser).length // return 0 which reads in a predicate
    }

    return loggedUser
}

export const createEvent = async (event: EventInputProps) => {

    const user = getLoggedInUser()
    const query = `
        mutation CreateEvent ($input: EventInput){
            addEvent(eventInput: $input) {
                name
                description
                image
                tickets
                arena
                location { lat lng }
                start_date
                end_date
            }
        }
    `
    // console.log(event)
    const input = {
        ...event,
        _user: user._id
    }
    console.log(input)
    const res = await queryFetch(query, { input: input })
    console.log(res)
    if (res && res.data.addEvent.status === 200) {
        return res.data.addEvent
    } else return res.data.addEvent.errors

}