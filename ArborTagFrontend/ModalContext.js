import React, { createContext, useContext, useState} from 'react';
import { View, StyleSheet } from 'react-native';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ isVisible: false, content: null });

  const showModal = (content) => setModal({ isVisible: true, content });
  const hideModal = () => setModal({ isVisible: false, content: null });

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
    {children}
    {modal.isVisible && modal.content ? (
  <View style={styles.modalOverlay}>
    {modal.content}
  </View>
) : null}
  </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
    },
  });
