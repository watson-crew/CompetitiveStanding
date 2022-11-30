import { CreateUserPayload } from "schema";
import { ApiContext } from "@src/context/ApiContext";
import { ChangeEvent, FormEvent, useContext, useEffect, useReducer } from "react";
import { Banner, Button, Card, Text, TextInput } from "ui";
import { Actions, initialState, signupReducer } from "./state";

export default function Index() {
  const api = useContext(ApiContext)
  const [signupState, dispatch] = useReducer(signupReducer, initialState);

  useEffect(() => {
    if (signupState.memorableId.length === 3) { 
      doesMemorableIdExist(signupState.memorableId)
    }
  }, [signupState.memorableId])

  const handleOnChange = (action: Actions, event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ action, inputValue: event.target.value })
  }

  const handleError = (message: string) => {
    if (signupState.errorMessages.find(text => text === message) === undefined)
      dispatch({ action: Actions.setError, errorMessage: message })
  }

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let error = false
    const { firstName, lastName, memorableId, memorableIdExists } = signupState

    const user: CreateUserPayload = {
      firstName,
      lastName,
      memorableId,
      homeLocationId: 1
    }
    
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      memorableId.length === 0
    ) {
      error = true
      handleError('Please fill in all the fields')
    }
    
    if (memorableIdExists) {
      error = true
      handleError('Please fill in a unique player ID')
    }

    try {
      if (error) return 
      await api.user.createUser(user)
      dispatch({ action: Actions.resetState })
    } catch (e) {
      handleError('Error creating player')
    }
  }

  const doesMemorableIdExist = async (memborableId: string) => {
    try {
      await api.user.getUserByMemorableId(memborableId)
      dispatch({ action: Actions.memorableIdExists, inputCheck: true })
    } catch (e) {
      dispatch({ action: Actions.memorableIdExists, inputCheck: false })
    }
  }

  return (
    <div className="flex h-screen flex-col items-center mt-20">
      <h1 className="text-3xl font-bold underline mb-24">Sign up</h1>
        { signupState.errorMessages.length > 0 ? 
          <Banner className="w-96 mb-6" type="error">{signupState.errorMessages.map((error, index) => 
            <Text key={index} type="p">
              {error}
            </Text>)}
          </Banner> : null }
        <Card className="w-96">
          <form onSubmit={createUser}>
            <TextInput id="firstName" title="First Name" value={signupState.firstName} onChange={(event) => handleOnChange(Actions.firstNameChange, event)} maxLength={24} />
            <TextInput id="lastName" title="Last Name" value={signupState.lastName} onChange={(event) => handleOnChange(Actions.lastNameChange, event)} maxLength={24} />
            <TextInput id="memorableId" title="Memorable ID" value={signupState.memorableId} onChange={(event) => handleOnChange(Actions.memorableIdChange, event)} maxLength={3} />
            <Button type='submit' text="Create player" className="w-full mt-8 mb-2" />
          </form>
        </Card>
    </div>
  )

}