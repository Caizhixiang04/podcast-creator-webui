"""
Streamlit 调试面板占位（M0）。

产品体验请使用 Next.js：`web/`。
运行（可选）:
  pip install streamlit && streamlit run debug/streamlit_app.py
"""

import streamlit as st

st.set_page_config(page_title="Debug Panel", layout="centered")
st.title("Debug Panel (Streamlit)")
st.caption("仅内部调试。正式产品请打开 Next.js Web（见 docs/PROJECT_BRIEFING.md）。")
st.info("M0：占位。后续可接入数据探针、队列深度、模型路由实验等。")

if st.button("Ping"):
    st.success("pong")
