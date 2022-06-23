import axios from "axios";
import { NextPage } from "next";
import { useState , useEffect } from "react";
import { styled } from "../../../stitches.config";


const Wrapper = styled("div", {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});



const FormContainer = styled("div", {
  
});

const StyledOption = styled("option", {

});

const GenerateLinkButton = styled("button", {
  all: "unset",
  width: "fit-content",
  display: "flex",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "#FFFFFF",
  backgroundColor: "#3262F2",
});

const Administrator: NextPage = () => {
  const [formData, setFormData] = useState({
    email: ''
  })

  const [shortlink, setShortlink] = useState<string>('Seu link')

  
  const createSession = () => {
    axios.post(`http://localhost:3002/test-sessions`, {
      user: formData
    }).then(({data}) => {
      console.log(data)
      setShortlink(data.shortlink)
    }).catch(console.log)
  }

  const handleFormChange = (target: EventTarget & HTMLInputElement, prop: keyof typeof formData) => {
    console.log(target.value)
    setFormData({...formData, [prop] : target.value})
  }

  return (
    <Wrapper>
      Criar Sessão
      <FormContainer>
        <input id="email" type="text" onChange={({target}) => handleFormChange(target, 'email')}  />
      <GenerateLinkButton onClick={createSession.bind(formData)}>
        Gerar link
      </GenerateLinkButton>
      </FormContainer>

      <a href={shortlink}>{shortlink}</a>
    </Wrapper>
  );
}
export default Administrator;
