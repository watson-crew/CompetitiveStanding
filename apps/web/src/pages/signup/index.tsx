import { CreateUserPayload } from "schema";
import { ApiContext } from "@src/context/ApiContext";
import { ChangeEvent, FormEvent, useContext, useEffect, useReducer } from "react";
import { Button, Card, TextInput } from "ui";
import { Actions, initialState, signupReducer } from "./state";

export default function Index() {
  const api = useContext(ApiContext)
  const [inputs, dispatch] = useReducer(signupReducer, initialState);

  useEffect(() => {
    if (inputs.memorableId.length === 3) { 
      doesMemorableIdExist(inputs.memorableId)
    }
  }, [inputs.memorableId])

  const handleOnChange = (action: Actions, event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ action, value: event.target.value })
  }

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { firstName, lastName, memorableId, memorableIdExists } = inputs
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      memorableId.length === 0 ||
      memorableIdExists) return null

    const user: CreateUserPayload = {
      firstName,
      lastName,
      memorableId,
      homeLocationId: 1
    }

    try {
      await api.user.createUser(user)
      dispatch({ action: Actions.resetState })
    } catch (e) {
      console.log(`error creating player ${e}`)
    }
  }

  const doesMemorableIdExist = async (memborableId: string) => {
    try {
      await api.user.getUserByMemorableId(memborableId)
      dispatch({ action: Actions.memorableIdError, value: true })
    } catch (e) {
      dispatch({ action: Actions.memorableIdError, value: false })
    }
  }

  return (
    <div className="flex h-screen flex-col items-center mt-20">
      <h1 className="text-3xl font-bold underline mb-24">Sign up</h1>
        <Card className="w-96">
          <form onSubmit={createUser}>
            <TextInput id="firstName" title="First Name" value={inputs.firstName} onChange={(event) => handleOnChange(Actions.firstNameChange, event)} maxLength={24} />
            <TextInput id="lastName" title="Last Name" value={inputs.lastName} onChange={(event) => handleOnChange(Actions.lastNameChange, event)} maxLength={24} />
            <TextInput id="memorableId" title="Memorable ID" value={inputs.memorableId} onChange={(event) => handleOnChange(Actions.memorableIdChange, event)} maxLength={3} />
            <Button type='submit' text="Create player" className="w-full mt-8 mb-2" />
          </form>
        </Card>
    </div>
  )

}