import { Dispatch, SetStateAction } from 'react'


export type PlaceAutocompleteProps = {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void
    leftLabel?: boolean
    width?: string
    label?: string
    placeholder?: string
    name?: string
    error?: string
}

export type DatePickerProps = {
    label?: string
    leftLabel?: boolean
    initialValue?: string
    leftIcon?: boolean
    rightIcon?: boolean
    name: string
    onChange: (val: string) => void;
    width?: string
    error?: string
    value: number | null
}


export type contentProps = {
    selectedPlace: google.maps.places.PlaceResult | null
    range: number,
}

export type HeaderProps = {
    setSelectedPlace: Dispatch<SetStateAction<google.maps.places.PlaceResult | null>>
    setRange: React.Dispatch<React.SetStateAction<number>>
    range: number
}

export type SearchBoxProps = {
    setSelectedPlace: Dispatch<SetStateAction<google.maps.places.PlaceResult | null>>
    setRange: React.Dispatch<React.SetStateAction<number>>
    range: number
}

export type EventsProps = {
    _id: string
    name: string
    description?: string
    image?: string
    price: number
    tickets: number
    arena: string
    location: {
        lat: number | null
        lng: number | null
    }
    start_date: number | null
    end_date: number | null
}

export type GetEventsProps = {
    selectedPlace: google.maps.places.PlaceResult | null,
    range: number,
    geometry: google.maps.GeometryLibrary | null
}

export type GoogleMapProps = {
    place: google.maps.places.PlaceResult | null
    events: EventsProps[] | []
    range: number
}


export type UserProps = {
    firstname: string
    lastname: string
    email: string
}


export type RegisterInputProps = UserProps & {
    password: string
}

export type CreateUserProps = UserProps & { status: number } | object

export type LoginInputProps = {
    email: string
    password: string
}

export type LoggedInUser = UserProps & {
    status: number
    token: string
    _id: string
} | object

export type BookItButtonProps = {
    label: string
    width: string
    bgColor: string
    icon: React.ElementType
}

export type ModalProps = {
    children: React.ReactNode
}

export type ModalHeaderProps = {
    children: React.ReactNode
}

export type ModalFooterProps = {
    children: React.ReactNode
}


export type ModalContentProps = {
    children: React.ReactNode
}

export type NewEventFormProps = {
    cancel: () => void
}

export type EventInputProps = {
    name: string
    description?: string
    image?: string
    price: number
    tickets: number
    arena: string
    location: {
        lat: number | null
        lng: number | null
    }
    start_date: number | null
    end_date: number | null
}