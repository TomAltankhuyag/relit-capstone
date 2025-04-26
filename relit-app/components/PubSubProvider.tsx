import React, { createContext } from 'react';
import { PubSub } from '@aws-amplify/pubsub';


type Children = {children: React.ReactNode}
// const pubSub = new PubSub({ region: 'us-west-2'})

const pubSub = new PubSub({
  region: 'us-west-2',
  endpoint: 'wss://a3f9623llaje2z-ats.iot.us-west-2.amazonaws.com/mqtt',
})

export const PubSubContext = createContext<PubSub>(pubSub)
export default function PubSubProvider({children}: Children) {
  return(
    <PubSubContext.Provider value={pubSub}>
      {children}
    </PubSubContext.Provider>
  )
}

