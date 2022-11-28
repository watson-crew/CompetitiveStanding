import { CreateUserPayload } from "schema";
import { ApiContext } from "@src/context/ApiContext";
import { ChangeEvent, useContext, useEffect, useReducer } from "react";
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

  const createUser = async () => {
    const user: CreateUserPayload = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      memorableId: inputs.memorableId,
      homeLocationId: 1
    }

    try {
      await api.user.createUser(user)
    } catch (e) {
    }
  }

  const doesMemorableIdExist = async (memborableId: string): Promise<boolean> => {
    try {
      await api.user.getUserByMemorableId(memborableId)
      return true
    } catch (e) {
      return false
    }
  }

  return (
    <div className="flex h-screen flex-col items-center mt-20">
      <h1 className="text-3xl font-bold underline">Sign up</h1>
        <Card>
          <form>
            <TextInput id="firstName" title="First Name" value={inputs.firstName} onChange={(event) => handleOnChange(Actions.firstNameChange, event)} maxLength={24} />
            <TextInput id="lastName" title="Last Name" value={inputs.lastName} onChange={(event) => handleOnChange(Actions.lastNameChange, event)} maxLength={24} />
            <TextInput id="memorableId" title="Memorable ID" value={inputs.memorableId} onChange={(event) => handleOnChange(Actions.memorableIdChange, event)} maxLength={3} />
            <Button text="Create player" onClick={() => createUser()} />
          </form>
        </Card>
    </div>
  )

}