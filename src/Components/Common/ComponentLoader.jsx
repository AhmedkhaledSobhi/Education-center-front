import React from 'react'
import ButtonLoader from './ButtonLoader'

export default function ComponentLoader({
  height = 100,
  size = 60
}) {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          // height: 200,
          height: height,
        }}
      >
        <ButtonLoader
          color="#0d6efd"
          width={size}
          height={size}
        />
      </div>
    </React.Fragment>
  )
}
