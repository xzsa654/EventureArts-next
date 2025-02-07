'use client'

import React, { useState, useEffect } from 'react'
import firebaseConfig from '@/config/firebase-config'
import { initializeApp } from 'firebase/app'
import { useAuth } from '@/hooks/use-auth'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
auth.languageCode = 'cn'

export default function FirebaseAuthPage(props) {
  const { firebaseLogin } = useAuth()
  const [isAuth, setIsAuth] = useState(false)
  const firebaseAuth = (e) => {
    let provider
    e.target.name == 'google'
      ? (provider = new GoogleAuthProvider())
      : (provider = new FacebookAuthProvider())
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsAuth(true)
        const credential =
          provider.providerId == 'google.com'
            ? GoogleAuthProvider.credentialFromResult(result)
            : FacebookAuthProvider.credentialFromResult(result)
        const accessToken = credential.accessToken
      })
      .catch((ex) => {
        console.log(ex)
      })
  }
  useEffect(() => {
    // 監聽登入狀態是否有改變
    if (isAuth) {
      auth.onAuthStateChanged(async (user) => {
        //登入狀態
        if (user) {
          user.getIdToken().then((token) => {
            firebaseLogin(token)
          })
        }
      })
    }
  }, [isAuth, firebaseLogin])

  return (
    <>
      <button name="google" onClick={firebaseAuth}>
        GOOGLE
      </button>
      <hr />
      <button name="facebook" onClick={firebaseAuth}>
        FACEBOOK
      </button>
    </>
  )
}
