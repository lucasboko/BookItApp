import { Modal, ModalContent, ModalHeader, ModalFooter } from ".."
import { CurrencyDollarIcon, TicketIcon, PlusIcon, BuildingLibraryIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { DatePicker, Input, PlaceAutocomplete } from "../../components"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { createEvent } from "../../utilities"



type EventFormValues = {
    name: string;
    arena: string;
    tickets: number;
    price: number;
    start_date: number | null;
    end_date: number | null;
    location: {
        lat: number | null;
        lng: number | null;
    };
}
const newEventFormSchema = Yup.object().shape({
    name: Yup.string().required('Whats the name of the event?'),
    arena: Yup.string().required('Whats the name of the venue?'),
    tickets: Yup.number()
        .positive("Must be a positive value")
        .required("How many tickets are you selling")
        .min(1, "You can't enter less than one"),
    price: Yup.number().required('How much is the ticket?'),
    start_date: Yup.number().required('When does it start?'),
    end_date: Yup.number().required('Required'),
    location: Yup.object({
        lat: Yup.number().required('Where is it happening?'),
        lng: Yup.number().required('Where is it happening?'),
    }).required(),
});

export const AddEvent = () => {

    const [showModal, setShowModal] = useState<boolean>(false)

    const newEventFormik = useFormik<EventFormValues>({
        initialValues: {
            name: '',
            arena: '',
            tickets: 0,
            price: 0,
            start_date: null,
            end_date: null,
            location: {
                lat: null,
                lng: null
            }
        },
        validationSchema: newEventFormSchema,
        onSubmit: async (values, actions) => {

            actions.setSubmitting(true)
            const bool = await createEvent({
                ...values,
                image: "ctifj.jpg",
                price: parseFloat(values.price.toString()),
                tickets: parseFloat(values.tickets.toString())
            })

            if (bool) {
                console.log(bool)
            }

        },
    });

    const handleChange =
        (value: google.maps.places.PlaceResult | string | null, fieldName: string) =>
            newEventFormik.setFieldValue(fieldName, value, true)

    const showError = (field: keyof EventFormValues) => newEventFormik.touched[field]
        ? newEventFormik.errors[field] as string
        : undefined

    const showLocationError = () => newEventFormik.errors.location?.lat || newEventFormik.errors.location?.lng

    const cancel = () => {
        newEventFormik.resetForm()
        setShowModal(false)
    }

    const handleLocationChange = (val: google.maps.places.PlaceResult | null) => {
        newEventFormik.setFieldValue(
            "location",
            {
                lat: val?.geometry?.location?.lat(),
                lng: val?.geometry?.location?.lng()
            },
            true
        )
    }


    return (
        <div>
            <button
                className={`
                    py-[5px] px-[20px]  
                    bg-white bg-gray-300 hover:bg-emerald-50 
                    font-bold text-emerald-700 text-center text-xs
                    cursor-pointer 
                    border-1 border-emerald-700 rounded-full
                    flex items-center gap-[5px]
                `}
                onClick={() => setShowModal(true)}
            >
                <PlusIcon className='size-4' /> <span>Add event</span>
            </button>
            {showModal &&
                <Modal  >
                    <ModalHeader>Create Event</ModalHeader>
                    <ModalContent>
                        <div className="bg-gray-100 w-full h-50 border-1 border-gray-200 justify-items-center text-center rounded-2xl">
                            <PlusCircleIcon className="size-10 text-emerald-400 mt-20 cursor-pointer" onClick={() => alert('upload image')} />
                        </div>
                        <Input
                            width="w-full"
                            name="name"
                            placeholder="Enter your cool event name"
                            label="Event name"
                            onChange={val => handleChange(val, "name")}
                            value={newEventFormik.values.name}
                            error={showError("name")}
                            readOnly={newEventFormik.isSubmitting}
                        />
                        <Input
                            width="w-full"
                            name="arena"
                            label="Venue"
                            placeholder="What cool venue is it?"
                            onChange={val => handleChange(val, "arena")}
                            value={newEventFormik.values.arena}
                            rightIcon={<BuildingLibraryIcon className="flex-none size-5 text-gray-400" />}
                            error={showError("arena")}
                            readOnly={newEventFormik.isSubmitting}
                        />

                        <PlaceAutocomplete
                            width="w-full"
                            name="location"
                            placeholder="Vienna, Italy"
                            onPlaceSelect={val => handleLocationChange(val)}
                            error={showLocationError()}
                            label="Address"
                        />

                        <div className="w-full flex gap-[4%]">
                            <Input
                                width="w-[48%]"
                                name="price"
                                label="Price"
                                type="number"
                                onChange={val => handleChange(val, "price")}
                                value={newEventFormik.values.price}
                                placeholder="0.00"
                                rightIcon={<CurrencyDollarIcon className="flex-none size-5 text-gray-400" />}
                                error={showError("price")}
                                readOnly={newEventFormik.isSubmitting}
                            />

                            <Input
                                width="w-[48%]"
                                name="seats"
                                label="Tickets"
                                type="number"
                                onChange={val => handleChange(val, "tickets")}
                                value={newEventFormik.values.tickets}
                                placeholder="0"
                                rightIcon={<TicketIcon className="flex-none size-5 text-gray-400" />}
                                error={showError("tickets")}
                                readOnly={newEventFormik.isSubmitting}
                            />
                        </div>
                        <div className="w-full flex gap-[4%]">
                            <DatePicker
                                width="w-[48%]"
                                label="From"
                                name="start_date"
                                onChange={val => handleChange(val, "start_date")}
                                value={newEventFormik.values.start_date}
                                error={showError("start_date")}
                            />
                            <DatePicker
                                width="w-[48%]"
                                label="To"
                                name="end_date"
                                onChange={val => handleChange(val, "end_date")}
                                value={newEventFormik.values.end_date}
                                error={showError("end_date")}
                            />
                        </div>

                    </ModalContent>
                    <ModalFooter>
                        <button
                            type="button"
                            onClick={() => cancel()}
                            className={`
                                py-3 w-[150px] text-center 
                                bg-white border-emerald-700 
                                rounded-full bg-gray-300 
                                text-emerald-700 
                                font-bold 
                                cursor-pointer 
                                border-1
                                hover:bg-emerald-50 
                            `}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => newEventFormik.handleSubmit()}
                            className="hover:bg-emerald-600 py-3 w-[150px] text-center rounded-full bg-emerald-700 text-white font-bold cursor-pointer"
                        >
                            Save
                        </button>
                    </ModalFooter>
                </Modal>
            }
        </div>
    )

} 