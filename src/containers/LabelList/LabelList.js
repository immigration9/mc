import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  LabelListWrapper,
  LabelWrapper,
  ListsSection
} from "./LabelListStyles";
import PrimaryButton from "components/Buttons/PrimaryButton";
import AddLabelModal from "components/Modal/AddLabelModal";
import { fetchAllLabels, createLabel } from "actions/labelActions";
import { fetchAllMemoCount } from "actions/memoActions";

function LabelList() {
  const labels = useSelector(({ labels }) => labels.labels);
  const memos = useSelector(({ memos }) => memos.memos);
  const memosCount = useSelector(({ memos }) => memos.memosCount);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAllLabels());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllMemoCount(true));
  }, [memos, labels, dispatch]);

  return (
    <LabelListWrapper>
      <PrimaryButton
        onClick={() => setModalVisible(true)}
        size="big"
        text="레이블 추가"
      />

      <ListsSection>
        <LabelWrapper to={`/label/all`}>전체 ({memosCount})</LabelWrapper>
        {labels.map((lbl) => {
          return (
            <LabelWrapper key={lbl.id} to={`/label/${lbl.id}`}>
              {lbl.title} ({lbl.memoCount})
            </LabelWrapper>
          );
        })}
      </ListsSection>

      {modalVisible && (
        <AddLabelModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleOk={(title) => {
            dispatch(createLabel(title));
            setModalVisible(false);
          }}
        />
      )}
    </LabelListWrapper>
  );
}

export default LabelList;
