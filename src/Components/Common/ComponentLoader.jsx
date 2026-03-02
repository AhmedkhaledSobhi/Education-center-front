import React from 'react'
import ButtonLoader from './ButtonLoader'

export default function ComponentLoader() {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 200,
        }}
      >
        <ButtonLoader
          color="#0d6efd"
          width="70"
          height="70"
        />
      </div>
    </React.Fragment>
  )
}
