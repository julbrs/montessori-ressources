import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Canvas,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 28,
    marginRight: 28,
    marginTop: 28,
    flexDirection: "row",
  },
  card: {
    textAlign: "center",
  },
  imageContainer: {
    width: 368, // around 13 cm
    height: 368, // around 13 cm
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    width: 368,
    height: 56, // around 2cm
    marginTop: 28,
    paddingTop: 15,
  },
  footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  viewer: {
    height: "600px",
    width: "100%",
  },
  topcrop: {
    position: "absolute",
    top: 0,
    height: 28,
    width: "100%",
  },
  middlecrop: {
    position: "absolute",
    top: 396,
    height: 28,
    width: "100%",
  },
  bottomcrop: {
    position: "absolute",
    top: 480,
    height: 28,
    width: "100%",
  },
});

// Create Document Component
const NomenclaturePrint = (props) => {
  const { document } = props;

  // group the card 2 by 2
  let cardGrouped = [];
  document.cards.forEach((card, index) => {
    let groupedIndex = Math.trunc(index / 2);
    if (index % 2 === 0) {
      cardGrouped[groupedIndex] = [];
    }
    cardGrouped[groupedIndex].push(card);
  });

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        {cardGrouped.map((cards, index) => (
          <NomenclaturePage key={index} pageId={index} cards={cards} />
        ))}
      </Document>
    </PDFViewer>
  );
};

const NomenclaturePage = (props) => {
  let card = props.cards[0];
  let card2 = props.cards[1];
  return (
    <Page wrap={false} key={props.pageId} size="letter" orientation="landscape">
      <Canvas
        style={styles.topcrop}
        paint={(painter) =>
          // top crop marks
          painter
            .strokeOpacity(0.5)
            .lineWidth(0.25)
            .moveTo(28, 0)
            .lineTo(28, 28)
            .lineTo(0, 28)
            .stroke()
            .moveTo(368, 28)
            .lineTo(396, 28)
            .lineTo(396, 0)
            .stroke()
            .moveTo(396, 28)
            .lineTo(424, 28)
            .stroke()
            .moveTo(764, 0)
            .lineTo(764, 28)
            .lineTo(792, 28)
            .stroke()
        }
      />
      <Canvas
        style={styles.middlecrop}
        paint={(painter) =>
          // middle crop marks
          painter
            .strokeOpacity(0.5)
            .lineWidth(0.25)
            // left
            .moveTo(0, 0)
            .lineTo(28, 0)
            .lineTo(28, 12)
            .stroke()
            .moveTo(0, 28)
            .lineTo(28, 28)
            .lineTo(28, 16)
            .stroke()
            // center
            .moveTo(368, 0)
            .lineTo(396, 0)
            .lineTo(396, 12)
            .stroke()
            .moveTo(396, 0)
            .lineTo(424, 0)
            .stroke()
            .moveTo(368, 28)
            .lineTo(396, 28)
            .lineTo(396, 16)
            .stroke()
            .moveTo(396, 28)
            .lineTo(424, 28)
            .stroke()
            // right
            .moveTo(764, 12)
            .lineTo(764, 0)
            .lineTo(792, 0)
            .stroke()
            .moveTo(764, 16)
            .lineTo(764, 28)
            .lineTo(792, 28)
            .stroke()
        }
      />
      <Canvas
        style={styles.bottomcrop}
        paint={(painter) =>
          // bottom crop marks
          painter
            .strokeOpacity(0.5)
            .lineWidth(0.25)
            .moveTo(0, 0)
            .lineTo(28, 0)
            .lineTo(28, 28)
            .stroke()
            .moveTo(368, 0)
            .lineTo(396, 0)
            .lineTo(396, 28)
            .stroke()
            .moveTo(396, 0)
            .lineTo(424, 0)
            .stroke()
            .moveTo(764, 28)
            .lineTo(764, 0)
            .lineTo(792, 0)
            .stroke()
        }
      />
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: card.file.src,
              }}
            />
          </View>
          <Text style={styles.label}>{card.name}</Text>
        </View>

        {card2 && (
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: card2.file.src,
                }}
              />
            </View>
            <Text style={styles.label}>{card2.name}</Text>
          </View>
        )}
      </View>

      <Text style={styles.footer} fixed>
        Carte créé par l'auteur --- CC BY NC SA 4.0
      </Text>
    </Page>
  );
};

export default NomenclaturePrint;
