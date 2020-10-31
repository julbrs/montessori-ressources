import React, { useState, useEffect } from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Canvas } from '@react-pdf/renderer'
import { useParams } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer'
import client from '../../tools/client'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  section: {
    margin: 10,
    padding: 0,
    flex: 1,
    textAlign: "center",
  },
  image: {
    maxWidth: "13.5cm",
    maxHeight: "13.5cm",
  },
  label: {
    maxWidth: "13.5cm",
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  viewer: {
    height: "600px",
    width: "100%",
  },
  canvas: {
    height: "10px",
    width: "13.5cm"
  },
  text: {
    marginTop: "10px",
  }
});

// Create Document Component
const Nomenclature = () => {
  let { nomenclatureId } = useParams();
  const [loading, isLoading] = useState(true)
  const [nomenclature, setNomenclature] = useState([])

  useEffect(() => {
    client.get(`/nomenclatures/${nomenclatureId}`)
      .then(
        (result) => {
          setNomenclature(result.data)
          isLoading(false)
        }
      )
  }, [nomenclatureId])

  if (loading) {
      return <div>Chargement…</div>;
  } else {

    // group the card 2 by 2
    let cardGrouped = []
    nomenclature.cards.forEach((card, index) => {
      let groupedIndex = Math.trunc(index/2)
      if (index % 2 === 0) {
        cardGrouped[groupedIndex] = []
      }
      cardGrouped[groupedIndex].push(card)
    })

    return (
      <PDFViewer style={styles.viewer}>
        <Document>
          {cardGrouped.map((cards, index) => (
            <NomenclaturePage key={index} pageId={index} cards={cards} />
          ))}
        </Document>
      </PDFViewer>
    );
  }
}

const NomenclaturePage = (props) => {
  return (
    <Page wrap={false} key={props.pageId} size="A4" orientation="landscape" style={styles.page}>
      {props.cards.map((card) => (
        <View key={card.id} style={styles.section}>
          <Canvas style={styles.canvas}
              paint={painter =>
              painter
                .moveTo(10, 0).lineTo(10, 10).lineTo(0, 10).stroke()
                .moveTo(372, 0).lineTo(372, 10).lineTo(382, 10).stroke()
                }
          />
          <Image 
            style={styles.image} 
            source={{
              uri: card.location,
              headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
            }}
          />
          <Canvas style={styles.canvas}
              paint={painter =>
              painter
                .moveTo(0, 0).lineTo(10, 0).lineTo(10, 10).stroke()
                .moveTo(372, 10).lineTo(372, 0).lineTo(382, 0).stroke()
                }
          />
          <View style={styles.text}>
            <Canvas style={styles.canvas}
                paint={painter =>
                painter
                  .moveTo(10, 0).lineTo(10, 10).lineTo(0, 10).stroke()
                  .moveTo(372, 0).lineTo(372, 10).lineTo(382, 10).stroke()
                  }
            />
            <Text style={styles.label}>{card.originalname}</Text>
            <Canvas style={styles.canvas}
                paint={painter =>
                painter
                  .moveTo(0, 0).lineTo(10, 0).lineTo(10, 10).stroke()
                  .moveTo(372, 10).lineTo(372, 0).lineTo(382, 0).stroke()
                  }
            />
          </View>
          
        </View>
      ))}
      <Text style={styles.footer} fixed>
        Carte créé par l'auteur --- CC BY NC SA 4.0
      </Text>
    </Page>
  )
}

export default Nomenclature
