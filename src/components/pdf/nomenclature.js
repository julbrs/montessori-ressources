import React, { useState, useEffect } from 'react'
import {API} from '../../config'
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'
import { useParams } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const Nomenclature = () => {
  let { nomenclatureId } = useParams();
  const [loading, isLoading] = useState(true)
  const [nomenclature, setNomenclature] = useState([])

  useEffect(() => {
    fetch(`${API}/nomenclatures/${nomenclatureId}`)
      .then(res => res.json())
      .then(
        (result) => {
          setNomenclature(result)
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
      <PDFViewer width="100%" height="600px">
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
    <Page key={props.pageId} size="A4" orientation="landscape" style={styles.page}>
      {props.cards.map((card) => (
        <View key={card._id} style={styles.section}>
          <Image style={{width:'13cm'}} src={card.location}/>
          <Text>{card.originalname}</Text>
        </View>
      ))}
    </Page>
  )
}

export default Nomenclature
