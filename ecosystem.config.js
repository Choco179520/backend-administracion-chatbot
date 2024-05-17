module.exports = {
  apps: [
    {
      name: 'backend-rapidazo',
      script: 'dist/main.js',
      env: {
        //* Ambiente de QA
        "NODE_ENV": 'test',
        "PORT": '3025',

        //* SEGURIDAD
        "SEGURIDAD": false,

        // TODO: db rapidazo y parametrica
        "DATABASE_HOST": '132.147.10.38',
        "DATABASE_PORT": '10438',
        "DATABASE_NAME": 'ISLAS29',
        "DATABASE_SCHEMA_RAPIZADO": 'RAPIDAZO',
        "DATABASE_SCHEMA_PARAMETRICA": 'PARAMETRICA',

        // TODO: credenciales db
        "DATABASE_USER":
          'E6CQNiGV+rBERufeyGi7fZzk1PvVjYu5SHdO/OwCIHP5HgwOCbb179MtWucSoj80ggFDFc4YDviPPT0WoNtrg2R6KqiXC+t2Q8xqZRDHmEE5YpBNiHERz0IZy9hzNwwXovpAaCwx9HTWThqUyP+Wnn5TsuUX4qgSt9MbLTEzM+1zNwsFv31F1WZFrDC4cuN+wTpTR6RZNSCyihbJ3CsFm8ZMFdftvTzF+LPnzNTC++M0h+lV+XLGxTUBnuy4xR/uPh8t3YyjzPfw/ZoyXGxnE09RYB/fbzOioZXiOXGVo+kL1nvWQSkc67HPwC5NXNPeutexHhuWxJBG9BhnOEe9ys8zjnsr19kYMMVZn+05wiQFYrOk+0skHRkvGOZmMBV+xE7jlhkpwkR9X4N1P/O+3I7xV0vMUoFO8SZD8WBqf3xLeyDuKlvfR7yaASIPN2XJ1aMLXG3AuXMDcIGZnQJsCaWbviSU61/+YiDxg1zxptG+jfwOnmMlrQYHFxYnitxZJQfTBcwhg0XDB4Cf9dfdjIy1p/HKtKdtoQpaHb5eTE1fSXqs23eC7kTfS1NuRXemdBE07nR73bIGPpMaroVnpZqFCoQrmaRS3xyix2yjn6J9Kcf6khWaX/d+nb2xP92XfB+TO1a+SEsWz36J8pjUBe+CMtUP11iC9GOnGd8L65U=',
        "DATABASE_PASSWORD":
          'C03KWTX3i6GkjPkTdhDuwbKN9uW6lDvdB7lAca6/MVqBSkvxNf3ddHmD2bvXZUaGJ+HtpyA6QHfeWX8dNN1kVGxdJew2R3UJoSL6r1HeNDsjJp76j1jIe9Xb2E4mD0QJoh7HBBkb+ya2L3+6O1aaMJi3frQW3d1JiS+RgSCEp/ce1rkAtSjwr32YDSeTAgAOGxCxjAxA7NAtmE7IGyAJNCK8vExTXV9hOy6Z0mrOqOIvIAEGHxmUUulWozyj/84naAp7kN2ESJfWbyyeG97xN+fx5P4pZ5pMb8ww9UUqC4rIcMCdDQDGb9RB4icUQhxyu/U/RX70fIJWItPgWQ55TiRih9pkdoxUDPNx5bkCCY0BprNVi1VNXmIG+VGWy80BPGwCKYha5kQmbFWbIMUx8vVBcHrcgAhsnlMFrDBnwl89OXXTr8ZlNOVYk8X1cEaVmbBh4Kufkp7oy9RPN9+zFzmWt+7nQlCE8ZBh/mIlrzEeraVTxoaEuN1o3cT+BHsuYN4Q6Qh8FPgikt1pXTW1r+mogibCJJSpRfXB0dVCQdYg+BpsFWE9nx5BCjVq8DwLbIFoHwBSSCXDOGFwL+SvpZg8RwUeFNH1smMYWTpSOhhanfAxYcG4H1souSepfvXzWFdFZM75cWrTAGuG/rVxIBETLHurOv/ScskHa3cuxro=',

        // TODO: endpoint services 29
        "BUS_HOST_BUS": 'https://innova29bus-pruebas.29deoctubre.fin.ec',
        "BUS_PORT_BUS": '443',
        "BUS_SEGMENTO_BUS": 'bus29',

        // TODO: Codigo Oficial
        "CODIGO_OFICIAL": 9999,

        // TODO: Signal
        "ST_PROTO": 'https',
        "ST_HOST": 'api-documento-ai-29-oct-uat-zlx7ithz5q-uc.a.run.app',
        "ST_USUARIO":
          'AQ+jbXsmtYenqbiKFpnjvbPSozVhLArYjC1Ce/xGxpWkcgjJo/UWgp+ZmlJMFPHNPqgBSj0Lux63Io17owROT969dNn5t64wRh7EAfBMK/sCn2G3lWTJ3a3TbY9eU10etIj+/E+5wYPDhtQRQI8F9v+OVbN6VTX9eSKVDY0CqW6m0x3KZESD4+VghAYAls/cYYcgvcH4Tk8NE6iuizM1oOmdg4uBx40NfT0ESfeleQW6OyL9O5ToY16X9PUzHknWNWVO1NM4K2M2SpCvyHDmgmrQUJudU+Ef2x/uIR6vcFSlqSixHg6JY+YqVsa0Grqn4KwvGJJq1hjqGx52+oeVEhOe3fZE0dC0/55c2QPu1Wy/kPlxqzjRnXKIBSXnI6Zc9Q4HQwutPcOKgTEOuyMD4bFVTaDPeN7aDVBOpCHTnfmhnt+JwPN4jnogCQtWi1Eavq+R0I98UbAMb6wNX/SCglF/MbUg+HLkHi36RODNNbnIdZ/ay59SVzW+7joSkH1TvI5rBVF8ZrqljtOUjTO740ubUF1AtjCP5RSKCL36EMb9lRaBBorh9i8BSZ+fiml0qmScFTN927YV3/iki4CHTjJMgo6gdE4cO9z2AzDwWiE9gNVV4VaTnpgc7lrZhaZ8MV/t1tA59GOGwAHJy0X6Rs+eP+VW6JIIuCaFjteoGxM=',
        "ST_PASSWORD":
          'G4ZqXbIsVoZjLB1LZ9HVswxXjj6FfNxz/WVAfJ7azehT9h3FAw9gdGT0+hWbYc4lCkC+6QFtuRES8x6Ww7N6glQWE7Y6QzIYbzXSq/aaGule+zzfx7w/8gJZiR+Km6/8hSnx7kij4pt9BpI/RSxbInx2YOPl+xt9a1wWR+kaek1Usgt+z10qimVoB3MuMu5t/q6JPMhU1u77In/uLcj7zZ3TlqwI7TDTyZq6wEpb3Mm90joJF/7YhYKLiXNZdUvRfI1uSZ/MTBU6hKHAu4kdaeu+bUJ7zeg7sOZ2tpJxTfcA2CJMDnC6sb0nRQWVF0bxlPq1LmDEKKwe5XI2waHAGoiIJQ29enmasQGHsL3wYgfPjV0QR85+4Zy/Mvepxedd/5iKzAKLc/7BlJTJY9PDfZ8qY/yLlHVIimr65SBsJlaWhjJSX8SSsGNTG5mgRFWTQ8h+pXcgO0p7rw4+Ebhyjcq4NIM98kQ3zy2UMMIjRSA2wJO8t3IAiNryKUvIkpaYUL8bPHtUfyMJPokDCp3kwqHIF0qcUS4X1qVwNsm14LeoPr3y7DziYjzhem7ZMKMQ64xOyZPOG6sGfj5ZOXLWP+f/dAm8UHXjXc2DCdvEfUIf+3+MxEXVb6M8aaIFNp1FTlkBwZNXOV5V+s9UXSGBHqqdB4xlUhGCimci9V5MnA8=',
        "ST_CLIENTID": 'rlQIsOa3cCOgCRfsuNQwmAHFHA13',
      },
      env_production: {
        //* Ambiente de Produccion
        NODE_ENV: 'production',
        PORT: '3025',

        //* SEGURIDAD
        SEGURIDAD: true,

        // TODO: db rapidazo y parametrica
        DATABASE_HOST: '192.168.29.13',
        DATABASE_PORT: '10413',
        DATABASE_NAME: 'ISLAS29',
        DATABASE_SCHEMA_RAPIZADO: 'RAPIDAZO',
        DATABASE_SCHEMA_PARAMETRICA: 'PARAMETRICA',

        // TODO: credenciales db
        DATABASE_USER:
          'A77q3PV2Zau8r0AgxJIF6RIgQAHc2L/1o8F3qpT+63NrG14e1CXtfBZyBaUGW4Gmrcih2ZhWIViYR8vjLJpJs1DL9wUI/8uLIhI9Dlc8eqKiEEU8cVy6Jbc5RZ9ohE5fS9l9i1t1csXIDlj3uz4JO6x9+gMCN4Yy7HTcmcFLYqpn3FyJgtc4i7XlauOvLLwK+cfZvyyVPA/Z4on9GA8konTIW5gLafcWyJXaSy2SOCzPc4OrnRUpPBDDFvCAiyiggvtsHAgbT86duXD1bXooXtB6955z9EHEwvilObiHf2n3PynWtzNbm8pWjwP7yenhT+3jnniBWbsk3+QZ00ZOyJLcGFqze13Hgn5a+QxxS5B/Loq3Y55s3U5QC8z+NT/nzxB0izY8AagH4Jdcduab5wRtgfbknWKj5Lzx8tZ3ffYZaTloK3r/DVPTSaDo9QTiqg9QCHRWu/2hF/GXKlo28TkuMJX3hGDk4C5PM1dPCwaL3goIBO1+T80q9hifNdi0hFCejcZi3M+hCxAeGIEOcgq/MnUoOw0RY9+1XLgjSMmwBaMNhUfMd0LrZeEF5pzo7wNZvoHkJMO6ASrITG75F540tclNrm7B2Pop6OO0Rkx0UZIblx4no9vjl9NewwW6MDob2EDEDluxJrxFxp2nPypawSwmYMO03IY4Jy9/oHg=',
        DATABASE_PASSWORD:
          'B5sXalMLk0GLzfXAK6fOwkmMyG653f+/FbWhbistEfmOAPSqHDHg7luST6kZ4CeerHinTfjYkfLS3JoVuZQKsMmDWvniJwZlWHH6O4cqSG5EWFHbUXhUnw1sErDzLJK26a8XuORG71FJkCYq7z4GzRcd7HReoT82/whqgaHdZDIaXS1Od6EtMYZkFlfHKtsMXm8cvNwMSnk2N2ZomtL4vIDZ06DovPzlmkjBHjdniW7+i8+5nu2+nv2wHLJ8FhdmDGN4Dg796Rwds6wi0qbDEygI8Fc1/8X8YM3BBpR9vI3lr5F8s1sOJXcB3PEUxFmZFuNSBPDzcV1DIUZViaBNQNiRNJmr9+9CzlJpOkaJ9ir7J6RNsQX1qkzh+gaCwOEQK0Zm4NtAkceCcw4iz1kEFzibm9KMHsbefPQ6ZTE0Bd6mogk40l/Oo9EHM9X5pCI9DDhsIyNVuulO0OPlCF+7bJpZvUIUzLTWDak/TVlKRRaVw4lNWVAVqZUo9YHejOT5sR7ddfOKOr5Dj1U5k3MhOBfM+kd5Mgoxh5n9RQCL73Irw4jwikrFGrA97GXN5pLaLFfu86gzTyrDOYcsw0Gnfkq+CnYIKQ8AfofZou9/KGtzIXh77ia0Bdyff9WAcHkH9sCN1efMwLey2AriG52kduv5YBI+y8cIIbmunokfbjw',

        // TODO: endpoint services 29
        BUS_HOST_BUS: 'https://innova29bus.29deoctubre.fin.ec',
        BUS_PORT_BUS: '443',
        BUS_SEGMENTO_BUS: 'bus29',

        // TODO: Codigo Oficial
        CODIGO_OFICIAL: 9999,

        // TODO: Signal
        ST_PROTO: 'https',
        ST_HOST: 'api-documento-ai-29-oct-uat-zlx7ithz5q-uc.a.run.app',
        ST_USUARIO:
          'gZGkj9sOblg/2hDu1byX0B0iEUO1ZASIofFvgwqGJ716xUCXyHB5nLDhyO2niUj05Ex3AV/JQjZTlg09eYD9nIGRme6WiSzo2UhOnZ+GJ+E7UKPlY8RFH4U3/1Z8UtDm1qZRNQDqM8WjO2tq6qzhjowB1SqDkPEo8aWdYRHRiXTnfMv50MHU1nqpzjT8G+UjEOQSmAP2O3rrVfjwGQZk8UOhfMXubiPLJ5ATisqjRTFcDSRC8ikPV1/dMKDzxMDbZjpg3+pJ/ukh7xrjJIQDFevTz1PJj3dJsBTvoQaigibnBndRrUvoJtDS6U69SLVoRVLVnVq5grIivHboJU+z9kEhNwbsILLRshb4sxrs9wrmC8RpNs0c44dnXVzTLgLhXiC9V0c5wE98ygCkhDQayCq6aTXID01noPyPgdRJYAOjKPHOyZbMRDaLRzBC8qkEH2HElH1jal1XCVOl6c3OZ2TZIuZn2Fs3gGieA8TtaQVYzo0ZGj8bQZjsomO65eoBbwmpCYe0uB7LMQDcuUzMfegdR1qMLd9eS3zIsTMcQPJokmFqmE4XMGzECK69X1LHhCCNk9k8FQCWkEROZWgxGfZd+TwOldid8MS8eLQieVN6BVKAJNCyVusuZcXM5jHjFt2oZATm0m9PPeBCmqL6O31XrdjDQ9eOUCHadPLS+F8=',
        ST_PASSWORD:
          'FqBGQzd1m6PC1ZCckV/sElPiFRgG7pmz5ecSB3ehI3vu3t5681ltuMXRFkf0ofR8/OvMuWC0Tc1mZuJdsBF0jad7aQ+9jKwHMDfD5SmVM6Kwsy+5kCca7/QShcLVB2/44tnPhNNuVGiiou20KjXMTcvVlqHFMATrvL8GJ0p0PwZO2fwXzqXM/by/WnZ7ryfX+/W5/2IRL1D6iH6u+Nh9cc1dBTVH69EEa+GmSa24XkbYjPzTiJkxHRju6wp7hjGC3QPcTAmELWIaGbT0XJ/eJbttcU0Ic2tIDbuft7JOgA6T3m3PmZ8gnxu0+06YQz4elU2grNUzb84W7iM6fWVThRyNwMzkWkJSdVTEcfIMK4khm2KZSzz0bwulmV46RO5Tv+8NRojqEpA6z3eKY9ppTAl62zbFESnwxfyHszb3ALDXcpy5jSmlqqGRDCzRKVs+RowbVjxP+tCtoKU/sTtRqsYMre2T7EzCuysqkV1gtDR/AnueMBquWUTE9mAPOk653W5hRmuIbm3RL1fBrPBVl57iGxPpWDv+2gWBXYKnwundZ57mxL+L3liRcIvAk6/DlRVpYS9SaLwyh4cIOPrjN5E0C7gpz4hDpaunZ8emmm0M/tluhZtMWzt0/pxKha9ytgFlXnKp8oQlMINsnoxHGar556uOG0TXmMUbwR1BJk0=',
        ST_CLIENTID: 'LmnrepIcU9QNsVbgH5qkpqY9cHj2',
      },
    },
  ],
};
